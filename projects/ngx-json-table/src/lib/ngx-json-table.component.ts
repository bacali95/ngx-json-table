import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Icons, iconsPackages, Settings } from './lib/settings';
import { deepExtend, JsonValue } from './lib/helpers';

@Component({
  selector: 'lib-json-table',
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
    this.buildIcons(this.defaultSettings.icons);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.settings) {
      this.defaultSettings.icons = iconsPackages[this.settings?.iconPackage ?? 'basic'];
      this.defaultSettings = deepExtend({}, this.defaultSettings, this.settings);
      this.buildIcons(this.defaultSettings.icons);
    }
  }

  buildIcons(icons: Icons) {
    for (const [, value] of Object.entries(icons)) {
      value.class = value.class ?? '';
      value.innerText = value.innerText ?? '';
      value.color = value.color ?? 'inherit';
      value.html =
        value.html ??
        `<i class="ngx-json-table-icon ${value.class}" style="color: ${value.color}">${value.innerText}</i>`;
    }
  }
}
