import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { JsonTreeNode } from '../../lib/json-tree-node';
import { Icons, Settings, SortType } from '../../lib/settings';
import { JsonTreeEvent, JsonValue } from '../../lib/types';
import { TheadComponent } from '../thead/thead.component';

@Component({
  selector: '[ngx-json-table-tbody]',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.scss'],
})
export class TbodyComponent implements OnChanges {
  @Input() data: JsonValue = {};
  @Input() head: TheadComponent;
  @Input() settings: Settings;
  @Input() icons: Icons;
  @Output() dataChange = new EventEmitter<JsonValue>();

  currentData: JsonValue = {};
  jsonTree: JsonTreeNode = new JsonTreeNode('root', '', 'object', -1, false, null, [], true);
  table: JsonTreeNode[] = [];

  constructor() {}

  ngOnChanges({ data }: SimpleChanges): void {
    if (data && this.currentData !== this.data) {
      this.data = this.data ?? {};
      this.currentData = this.data;
      this.rebuildJsonTree();
      this.rebuildTable();
      !data.isFirstChange() && this.dataChange.next(this.currentData);
      this.head.root = this.jsonTree;
    }
  }

  rebuildJsonTree() {
    this.jsonTree.children = [];
    this.buildJsonTree(this.jsonTree, this.data);
    this.settings.sortDirection && this.sortJsonTree(this.jsonTree, this.settings.sortDirection);
  }

  rebuildTable() {
    this.table = [];
    this.buildTable(this.jsonTree);
  }

  buildJsonTree(root: JsonTreeNode, object: JsonValue, level = 0) {
    root.isArray = Array.isArray(object);
    const keys = Object.keys(object);
    for (const key of keys) {
      const value = object[key];
      const node = new JsonTreeNode(
        key,
        typeof value !== 'object' ? value : '',
        value !== null ? typeof value : 'undefined',
        level,
        false,
        root,
        [],
        this.settings.expandAll
      );
      root.addChild(node);
      value !== null && typeof value === 'object' && this.buildJsonTree(node, value, level + 1);
    }
  }

  sortJsonTree(root: JsonTreeNode, sortDirection: SortType) {
    root.children.sort((a, b) => a.key.localeCompare(b.key));
    sortDirection === 'desc' && root.children.reverse();
    for (const node of root.children) {
      this.sortJsonTree(node, sortDirection);
    }
  }

  buildTable(root: JsonTreeNode) {
    root.level > -1 && this.table.push(root);
    for (const node of root.children) {
      this.buildTable(node);
    }
  }

  jsonTreeToObject(root: JsonTreeNode): JsonValue {
    let result: JsonValue;

    switch (root.type) {
      case 'object':
        result = root.isArray ? [] : {};
        for (const node of root.children) {
          result[node.key] = this.jsonTreeToObject(node);
        }
        break;
      case 'number':
      case 'bigint':
        result = parseFloat(`${root.value}`);
        break;
      case 'boolean':
        result = `${root.value}` === 'true';
        break;
      default:
        result = root.value;
        break;
    }

    return result;
  }

  toggleSortDirection(sortDirection: SortType) {
    this.sortJsonTree(this.jsonTree, sortDirection);
    this.somethingChanged('sort');
  }

  somethingChanged(event: JsonTreeEvent) {
    switch (event) {
      case 'add':
        this.rebuildTable();
        this.currentData = this.jsonTreeToObject(this.jsonTree);
        break;
      case 'sort':
      case 'delete':
        this.rebuildTable();
        this.currentData = this.jsonTreeToObject(this.jsonTree);
        this.dataChange.emit(this.currentData);
        break;
      case 'edit':
        this.currentData = this.jsonTreeToObject(this.jsonTree);
        this.dataChange.emit(this.currentData);
        break;
      case 'clean':
        this.rebuildTable();
        break;
    }
  }
}
