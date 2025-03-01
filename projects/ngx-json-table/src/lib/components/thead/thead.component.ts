import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icons, Settings, SortType } from '../../lib/settings';
import { JsonTreeNode } from '../../lib/json-tree-node';
import { JsonTreeEvent, JsonValue } from '../../lib/types';

@Component({
  selector: '[ngx-json-table-thead]',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.scss'],
})
export class TheadComponent {
  @Input() root: JsonTreeNode;
  @Input() settings: Settings;
  @Input() icons: Icons;
  @Output() valueChange = new EventEmitter<JsonTreeEvent>();
  @Output() fileLoaded = new EventEmitter<JsonValue>();
  @Output() sortDirectionChange = new EventEmitter<SortType>();

  constructor() {}

  toggleSortDirection() {
    this.settings.sortDirection = this.settings.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortDirectionChange.emit(this.settings.sortDirection);
  }

  toggleDropdownMenu(dropdown: HTMLSpanElement) {
    const value = dropdown.style.display;
    dropdown.style.display = value === 'none' || value === '' ? 'block' : 'none';
  }

  addChild(dropdown: HTMLSpanElement, isObject = false, isArray = false) {
    dropdown.style.display = 'none';
    const node = new JsonTreeNode('', '', isObject ? 'object' : 'string', 0, isArray, this.root);
    node.edit = true;
    node.isNew = true;
    this.root.children.splice(0, 0, node);
    this.valueChange.emit('add');
  }

  loadFile(event: InputEvent) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file && file.type === 'application/json') {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        const object = JSON.parse(fileReader.result as string);
        this.fileLoaded.emit(object);
      };
    }
  }
}
