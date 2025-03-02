import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { Settings } from '../../../lib/settings';

@Component({
  selector: '[ngx-json-table-value]',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss'],
})
export class ValueComponent {
  @Input() item: JsonTreeNode;
  @Input() settings: Settings;
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
    if (this.item.checkNotUniqueKey()) return;
    this.item.toggleEdit();
    this.item.updateState();
    this.somethingChanged.emit('edit');
  }
}
