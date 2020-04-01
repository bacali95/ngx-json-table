import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { JsonTreeNode } from '../../lib/json-tree-node';
import { Settings, SortType } from '../../lib/settings';
import { JsonObject, JsonTreeEvent, JsonValue } from '../../lib/helpers';

@Component({
  selector: '[ngx-json-table-tbody]',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.css']
})
export class NgxJsonTableTbodyComponent implements OnChanges {

  @Input() data: JsonObject;
  @Input() settings: Settings;
  @Output() onChange = new EventEmitter<any>();

  jsonTree: JsonTreeNode;
  table: JsonTreeNode[];
  sortDirection: SortType;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortDirection = this.settings.headers.key.sortDirection;
    this.rebuildJsonTree();
    this.rebuildTable();
    if (!changes.data?.isFirstChange()) {
      this.onChange.next(this.data);
    }
  }

  rebuildJsonTree() {
    this.jsonTree = new JsonTreeNode('root', '', -1, true, false, null, [], true);
    this.buildJsonTree(this.jsonTree, this.data);
  }

  rebuildTable() {
    this.table = [];
    this.buildTable(this.jsonTree);
  }

  buildJsonTree(root: JsonTreeNode, object: JsonValue, level: number = 0) {
    root.isArray = Array.isArray(object);
    const keys = Object.keys(object);
    for (const key of keys) {
      const value = object[key];
      const node = new JsonTreeNode(key, typeof value !== 'object' ? value : '',
        level, typeof value === 'object', false, root);
      root.addChild(node);
      typeof value === 'object' && this.buildJsonTree(node, value, level + 1);
    }
  }

  sortJsonTree(root: JsonTreeNode, sortDirection: SortType = 'asc') {
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
    const result = root.isComplex
      ? root.isArray ? [] : {}
      : root.value;
    for (const node of root.children) {
      result[node.key] = this.jsonTreeToObject(node);
    }
    return result;
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortJsonTree(this.jsonTree, this.sortDirection);
    this.somethingChanged('sort');
  }

  somethingChanged(event: JsonTreeEvent) {
    event !== 'edit' && this.rebuildTable();
    this.onChange.next(this.jsonTreeToObject(this.jsonTree));
  }
}
