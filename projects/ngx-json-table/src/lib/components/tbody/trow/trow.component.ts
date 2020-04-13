import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { JsonTreeEvent } from '../../../lib/helpers';
import { Icons, Settings } from '../../../lib/settings';

@Component({
  selector: '[ngx-json-table-trow]',
  templateUrl: './trow.component.html',
  styleUrls: ['./trow.component.scss']
})
export class NgxJsonTableTrowComponent {

  @Input() item: JsonTreeNode;
  @Input() settings: Settings;
  @Input() icons: Icons;
  @Output() onChange = new EventEmitter<JsonTreeEvent>();

  constructor() {
  }

  @HostListener('mouseenter')
  onMouseEnterListener() {
    this.item.showEditPanel = true;
  }

  @HostListener('mouseleave')
  onMouseLeaveListener() {
    this.item.showEditPanel = false;
  }

}
