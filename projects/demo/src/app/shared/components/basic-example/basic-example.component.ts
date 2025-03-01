import { Component } from '@angular/core';
import { Settings } from 'ngx-json-table';

@Component({
  selector: 'basic-example',
  template: ` <ngx-json-table [settings]="settings"></ngx-json-table> `,
})
export class BasicExampleComponent {
  settings: Settings = {
    sortable: true,
    sortDirection: 'asc',
    expandAll: true,
    loadFromFile: true,
    options: {
      add: true,
      edit: {
        key: true,
        value: true,
      },
      delete: true,
    },
  };
}
