import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Settings } from './lib/settings';
import { deepExtend, JsonObject } from './lib/helpers';

@Component({
  selector: 'ngx-json-table',
  templateUrl: './ngx-json-table.component.html',
  styleUrls: ['./ngx-json-table.component.scss'],
})
export class NgxJsonTableComponent implements OnChanges {

  @Input() data: JsonObject;
  @Input() settings: Settings = {};
  @Output() onChange = new EventEmitter<any>();

  defaultSettings: Settings = {
    headers: {
      key: {
        text: 'Key',
        width: '30%',
        sort: false,
        sortDirection: 'asc'
      },
      value: {
        text: 'Value',
        width: '30%'
      },
    },
    body: {}
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.settings = deepExtend({}, this.defaultSettings, this.settings);
  }
}
