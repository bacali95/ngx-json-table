import { Component } from '@angular/core';
import { Settings } from 'ngx-json-table';
import { JsonObject } from '../../../ngx-json-table/src/lib/lib/helpers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  object: JsonObject = {
    product: 'Live JSON generator',
    version: 3.1,
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
  settings: Settings = {
    headers: {
      key: {
        text: 'Custom Key Header',
        width: '50%',
        sort: true,
      }
    }
  };

  onFileSelect(files: FileList) {
    if (!files[0] || files[0].type !== 'application/json') return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (event) => {
      this.object = JSON.parse(event.target.result.toString());
    };
  }

  stringify(object: JsonObject) {
    return JSON.stringify(object, null, 2);
  }
}
