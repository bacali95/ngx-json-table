import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icons, Settings, SortType } from '../../lib/settings';
import { JsonTreeNode } from '../../lib/json-tree-node';
import { JsonTreeEvent } from '../../lib/helpers';

@Component({
  selector: '[ngx-json-table-thead]',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.scss']
})
export class NgxJsonTableTheadComponent {

  @Input() root: JsonTreeNode;
  @Input() settings: Settings;
  @Input() icons: Icons;
  @Output() onChange = new EventEmitter<JsonTreeEvent>();
  @Output() fileLoaded = new EventEmitter<any>();
  @Output() onSortDirectionChange = new EventEmitter<SortType>();

  constructor() {
  }

  toggleSortDirection() {
    this.settings.sortDirection = this.settings.sortDirection === 'asc' ? 'desc' : 'asc';
    this.onSortDirectionChange.emit(this.settings.sortDirection);
  }

  toggleDropdownMenu(dropdown: HTMLSpanElement) {
    const value = dropdown.style.display;
    dropdown.style.display = value === 'none' || value === '' ? 'block' : 'none';
  }

  addChild(dropdown: HTMLSpanElement, isObject: boolean = false, isArray: boolean = false) {
    dropdown.style.display = 'none';
    const node = new JsonTreeNode('', '', isObject ? 'object' : 'string', 0, isArray, this.root);
    node.edit = true;
    node.isNew = true;
    this.root.children.splice(0, 0, node);
    this.onChange.emit('add');
  }

  loadFile(event) {
    const [file] = event.target.files;
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
