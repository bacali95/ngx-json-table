import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableRow } from "./lib/table-row";
import { Subject } from "rxjs";

@Component({
  selector: 'ng2-json-table',
  styleUrls: ['./ng2-json-table.component.scss'],
  templateUrl: './ng2-json-table.component.html',
})
export class Ng2JsonTableComponent implements OnChanges {

  @Input() data: Object = {};
  @Output() onChange: Subject<Object> = new Subject<Object>();
  jsonTree: TableRow;
  table: TableRow[];
  counter = Array;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildJsonTree();
    this.rebuildTable();
    this.onChange.next(this.data);
  }

  private rebuildJsonTree() {
    this.jsonTree = new TableRow('root', '', -1, true, false, null, [], true);
    this.buildJsonTree(this.jsonTree, this.data);
  }

  private rebuildTable() {
    this.table = [];
    this.buildTable(this.jsonTree);
  }

  private buildJsonTree(root: TableRow, object: Object, level: number = 0) {
    if (Array.isArray(object)) {
      root.isArray = true;
      for (let i = 0; i < object.length; i++) {
        const node = new TableRow(i, typeof object[i] !== 'object' ? object[i] : '',
          level, typeof object[i] === 'object', false, root);
        root.addChild(node);
        typeof object[i] === 'object' && this.buildJsonTree(node, object[i], level + 1);
      }
    } else {
      for (const [key, value] of Object.entries(object)) {
        const node = new TableRow(key, typeof value !== 'object' ? value : '',
          level, typeof value === 'object', false, root);
        root.addChild(node);
        typeof value === 'object' && this.buildJsonTree(node, value, level + 1);
      }
    }
  }

  private buildTable(root: TableRow) {
    root.level > -1 && this.table.push(root);
    for (const node of root.children) {
      this.buildTable(node);
    }
  }

  private jsonTreeToObject(root: TableRow): any {
    if (root.isArray) {
      const result = [];
      for (const node of root.children) {
        result[node.key] = this.jsonTreeToObject(node);
      }
      return result;
    } else if (root.isComplex) {
      const result = {};
      for (const node of root.children) {
        result[node.key] = this.jsonTreeToObject(node);
      }
      return result
    } else {
      return root.value;
    }
  }

  changeNodeKey(item: TableRow, value: any) {
    if (value === '' || (item.parent
      && item.parent.children.filter(node => node.id != item.id && node.key === value).length > 0)) {
      item.setError();
      return;
    }
    item.changeKey(value);
    item.toggleEditKey();
    this.onChange.next(this.jsonTreeToObject(this.jsonTree));
  }

  changeNodeValue(item: TableRow, value: any) {
    item.changeValue(['false', 'true'].includes(value) ? Boolean(value === 'true') : value);
    item.toggleEditValue();
    this.onChange.next(this.jsonTreeToObject(this.jsonTree));
  }

  deleteItem(item: TableRow) {
    const {parent} = item;
    const parentIndex = parent?.children.findIndex((node) => node.id === item.id);
    parent?.children.splice(parentIndex, 1);
    if (parent?.isArray) {
      for (let i = parentIndex; i < parent.children.length; i++) {
        (parent.children[i].key as number)--
      }
    }
    this.rebuildTable();
    this.onChange.next(this.jsonTreeToObject(this.jsonTree));
  }

  addChildItem(parent: TableRow) {
    parent.showChildren = true;
    if (parent.isArray) {
      const node = new TableRow(parent.children.length, '', parent.level + 1, false, false, parent)
      node.editValue = true;
      parent.children.push(node);
      this.rebuildTable();
    } else {
      const node = new TableRow('', '', parent.level + 1, false, false, parent)
      node.editKey = true;
      node.editValue = true;
      parent.children.push(node);
      this.rebuildTable();
    }
  }

}
