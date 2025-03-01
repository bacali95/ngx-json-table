import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { iconsPackages, Settings } from './lib/settings';
import { deepExtend } from './lib/helpers';
import { JsonValue } from './lib/types';

@Component({
  selector: '[ngx-json-table]',
  templateUrl: './ngx-json-table.component.html',
  styleUrls: ['./ngx-json-table.component.scss'],
})
export class NgxJsonTableComponent implements OnChanges {
  @Input() data: JsonValue;
  @Input() settings: Settings;
  @Output() dataChange = new EventEmitter<JsonValue>();

  defaultSettings: Settings = {
    key: {
      headerText: 'Key',
      width: '40%',
    },
    value: {
      headerText: 'Value',
      width: '60%',
    },
    options: {
      add: false,
      edit: {
        key: false,
        value: false,
      },
      delete: false,
    },
    sortable: false,
    sortDirection: undefined,
    expandAll: false,
    loadFromFile: false,
  };

  constructor() {
    this.defaultSettings.icons = iconsPackages.basic;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.settings) {
      this.defaultSettings.icons = iconsPackages[this.settings?.iconPackage ?? 'basic'];
      const extendedSettings = deepExtend({}, this.defaultSettings, this.settings);
      if (extendedSettings !== false) {
        this.defaultSettings = extendedSettings;
      }
    }
  }
}
