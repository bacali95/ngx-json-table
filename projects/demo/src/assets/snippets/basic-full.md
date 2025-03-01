import { Component } from '@angular/core';
import { Settings } from 'ngx-json-table';

@Component({
  selector: 'app-basic-example-data',
  template: `
    <table ngx-json-table [data]="data" [settings]="settings"></table>
  `,
})
export class BasicExampleDataComponent {
  settings: Settings = {
    sortable: true,
    sortDirection: 'desc',
    expandAll: true,
    loadFromFile: true,
    options: {
      add: true,
      edit: {
        key: true,
        value: true
      },
      delete: true,
    }
  };

  data: any = {
    product: 'NGX JSON Table',
    version: 1.0,
    releaseDate: '2014-06-25T00:00:00.000Z',
    demo: true,
    person: {
      id: 12345,
      name: 'John Doe',
      phones: {
        home: '800-123-4567',
        mobile: '877-123-1234'
      },
      email: ['jd@example.com', 'jd@example.org'],
      dateOfBirth: '1980-01-02T00:00:00.000Z',
      registered: true,
      emergencyContacts: [
        {
          name: 'Jane Doe',
          phone: '888-555-1212',
          relationship: 'spouse'
        },
        {
          name: 'Justin Doe',
          phone: '877-123-1212',
          relationship: 'parent'
        }
      ]
    }
  };
}
