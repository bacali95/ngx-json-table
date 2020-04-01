import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeadSettings, SortType } from '../../lib/settings';

@Component({
  selector: '[ngx-json-table-thead]',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.css']
})
export class NgxJsonTableTheadComponent {

  @Input() settings: HeadSettings;
  @Output() onSortDirectionChange = new EventEmitter<SortType>();

  constructor() {
  }

  toggleSortDirection() {
    this.settings.key.sortDirection = this.settings.key.sortDirection === 'asc' ? 'desc' : 'asc';
    this.onSortDirectionChange.emit(this.settings.key.sortDirection);
  }

}
