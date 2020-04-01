import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { JsonTreeEvent } from '../../../lib/helpers';

@Component({
  selector: '[ngx-json-table-trow]',
  templateUrl: './trow.component.html',
  styleUrls: ['./trow.component.css']
})
export class NgxJsonTableTrowComponent {

  @Input() item: JsonTreeNode;
  @Output() onChange = new EventEmitter<JsonTreeEvent>();
  counter = Array;

  constructor() {
  }

  changeNodeKey(item: JsonTreeNode, value: any) {
    if (value === '' || (item.parent
      && item.parent.children.filter(node => node.id !== item.id && node.key === value).length > 0)) {
      item.setError();
      return;
    }
    item.changeKey(value);
    item.toggleEditKey();
    this.onChange.emit('edit');
  }

  changeNodeValue(item: JsonTreeNode, value: any) {
    item.changeValue(['false', 'true'].includes(value) ? Boolean(value === 'true') : value);
    item.toggleEditValue();
    this.onChange.emit('edit');
  }

  deleteItem(item: JsonTreeNode) {
    const {parent} = item;
    const parentIndex = parent?.children.findIndex((node) => node.id === item.id);
    parent?.children.splice(parentIndex, 1);
    if (parent?.isArray) {
      for (let i = parentIndex; i < parent.children.length; i++) {
        parent.children[i].key = `${parseInt(parent.children[i].key, 10) - 1}`;
      }
    }
    this.onChange.emit('delete');
  }

  addChildItem(parent: JsonTreeNode) {
    parent.showChildren = true;
    const node = new JsonTreeNode(parent.isArray ? `${parent.children.length}` : '', '', parent.level + 1, false, false, parent);
    node.editKey = !parent.isArray;
    node.editValue = true;
    parent.children.push(node);
    this.onChange.emit('add');
  }
}
