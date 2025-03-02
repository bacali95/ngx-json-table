import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { Icons, Settings } from '../../../lib/settings';

@Component({
  selector: '[ngx-json-table-key]',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
})
export class KeyComponent {
  @Input() item: JsonTreeNode;
  @Input() settings: Settings;
  @Input() icons: Icons;
  @Output() somethingChanged = new EventEmitter<'clean' | 'edit' | 'add' | 'delete'>();

  constructor() {}

  @HostListener('keyup.escape')
  onEscapeKeyListener() {
    this.item.resetState();
    this.item.edit && this.item.toggleEdit();
    if (this.item.isNew) {
      this.item.delete();
      this.somethingChanged.emit('clean');
    }
  }

  @HostListener('keyup.enter')
  onEnterKeyListener() {
    if (this.item.checkNotUniqueKey()) return false;

    this.item.toggleEdit();
    this.item.updateState();
    this.item.isNew = false;
    this.somethingChanged.emit('edit');

    return true;
  }

  addChild(isObject = false, isArray = false) {
    this.item.showChildren = true;
    const node = new JsonTreeNode(
      this.item.isArray ? '0' : '',
      '',
      isObject ? 'object' : 'string',
      this.item.level + 1,
      isArray,
      this.item
    );
    node.isNew = true;
    node.edit = true;
    if (this.item.isArray) {
      for (const child of this.item.children) {
        child.key = `${parseInt(child.key, 10) + 1}`;
      }
    }
    this.item.children.splice(0, 0, node);
    this.somethingChanged.emit('add');
  }

  toggleDropdownMenu(dropdown: HTMLSpanElement) {
    const value = dropdown.style.display;
    dropdown.style.display = value === 'none' || value === '' ? 'block' : 'none';
  }
}
