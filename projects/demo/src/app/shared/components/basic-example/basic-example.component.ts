import { Component } from '@angular/core';
import { Settings } from 'ngx-json-table';

@Component({
  selector: 'app-basic-example',
  template: ` <lib-json-table [settings]="settings"></lib-json-table> `,
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
