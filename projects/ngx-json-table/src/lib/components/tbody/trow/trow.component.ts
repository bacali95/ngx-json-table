import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { Icons, Settings } from '../../../lib/settings';

@Component({
  selector: '[ngx-json-table-trow]',
  templateUrl: './trow.component.html',
  styleUrls: ['./trow.component.scss'],
})
export class TrowComponent {
  @Input() item: JsonTreeNode;
  @Input() settings: Settings;
  @Input() icons: Icons;
  @Output() somethingChanged = new EventEmitter<'clean' | 'edit' | 'add' | 'delete'>();

  constructor() {}

  @HostListener('mouseenter')
  onMouseEnterListener() {
    this.item.showEditPanel = true;
  }

  @HostListener('mouseleave')
  onMouseLeaveListener() {
    this.item.showEditPanel = false;
  }
}
