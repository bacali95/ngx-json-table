import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TbodyComponent } from './tbody.component';
import { NgxJsonTableModule } from '../../ngx-json-table.module';
import { TheadComponent } from '../thead/thead.component';
import { Settings, iconsPackages } from '../../lib/settings';
import { JsonValue } from '../../lib/types';
import { Component, ViewChild } from '@angular/core';

// Create a test host component to provide the required inputs
@Component({
  template: `
    <table>
      <thead ngx-json-table-thead #thead [settings]="settings" [icons]="icons"></thead>
      <tbody
        ngx-json-table-tbody
        #tbody
        [data]="data"
        [head]="thead"
        [settings]="settings"
        [icons]="icons"
        (dataChange)="onDataChange($event)"></tbody>
    </table>
  `,
})
class TestHostComponent {
  @ViewChild('tbody') tbodyComponent: TbodyComponent;
  @ViewChild('thead') theadComponent: TheadComponent;

  data: JsonValue = {};
  settings: Settings = {
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
    expandAll: false,
  };
  icons = iconsPackages.basic;

  onDataChange(data: JsonValue): void {
    this.data = data;
  }
}

describe('TBodyComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let component: TbodyComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule],
      declarations: [TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    component = hostComponent.tbodyComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty data', () => {
    expect(Object.keys(component.data).length).toBe(0);
    expect(Object.keys(component.currentData).length).toBe(0);
    expect(component.jsonTree.children.length).toBe(0);
    expect(component.table.length).toBe(0);
  });

  it('should build json tree from simple object', () => {
    const testData: JsonValue = {
      name: 'John',
      age: 30,
      isActive: true,
    };

    hostComponent.data = testData;
    hostFixture.detectChanges();

    expect(component.jsonTree.children.length).toBe(3);
    expect(component.jsonTree.children[0].key).toBe('name');
    expect(component.jsonTree.children[0].value === 'John').toBe(true);
    expect(component.jsonTree.children[1].key).toBe('age');
    expect(component.jsonTree.children[1].value === 30).toBe(true);
    expect(component.jsonTree.children[2].key).toBe('isActive');
    expect(component.jsonTree.children[2].value === true).toBe(true);
  });

  it('should build json tree from nested object', () => {
    const testData: JsonValue = {
      person: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    };

    hostComponent.data = testData;
    hostFixture.detectChanges();

    expect(component.jsonTree.children.length).toBe(1);
    expect(component.jsonTree.children[0].key).toBe('person');
    expect(component.jsonTree.children[0].children.length).toBe(2);
    expect(component.jsonTree.children[0].children[0].key).toBe('name');
    expect(component.jsonTree.children[0].children[0].value === 'John').toBe(true);
    expect(component.jsonTree.children[0].children[1].key).toBe('address');
    expect(component.jsonTree.children[0].children[1].children.length).toBe(1);
    expect(component.jsonTree.children[0].children[1].children[0].key).toBe('city');
    expect(component.jsonTree.children[0].children[1].children[0].value === 'New York').toBe(true);
  });

  it('should build json tree from array', () => {
    const testData: JsonValue = {
      items: [1, 2, 3],
    };

    hostComponent.data = testData;
    hostFixture.detectChanges();

    expect(component.jsonTree.children.length).toBe(1);
    expect(component.jsonTree.children[0].key).toBe('items');
    expect(component.jsonTree.children[0].isArray).toBe(true);
    expect(component.jsonTree.children[0].children.length).toBe(3);
    expect(component.jsonTree.children[0].children[0].key).toBe('0');
    expect(component.jsonTree.children[0].children[0].value === 1).toBe(true);
    expect(component.jsonTree.children[0].children[1].key).toBe('1');
    expect(component.jsonTree.children[0].children[1].value === 2).toBe(true);
    expect(component.jsonTree.children[0].children[2].key).toBe('2');
    expect(component.jsonTree.children[0].children[2].value === 3).toBe(true);
  });

  it('should sort json tree when sortDirection is specified', () => {
    const testData: JsonValue = {
      c: 3,
      a: 1,
      b: 2,
    };

    hostComponent.settings = {
      ...hostComponent.settings,
      sortDirection: 'asc',
    };
    hostComponent.data = structuredClone(testData);
    hostFixture.detectChanges();

    expect(component.jsonTree.children.length).toBe(3);
    expect(component.jsonTree.children[0].key).toBe('a');
    expect(component.jsonTree.children[1].key).toBe('b');
    expect(component.jsonTree.children[2].key).toBe('c');

    // Test descending sort
    hostComponent.settings = {
      ...hostComponent.settings,
      sortDirection: 'desc',
    };
    hostComponent.data = structuredClone(testData);
    hostFixture.detectChanges();

    expect(component.jsonTree.children.length).toBe(3);
    expect(component.jsonTree.children[0].key).toBe('c');
    expect(component.jsonTree.children[1].key).toBe('b');
    expect(component.jsonTree.children[2].key).toBe('a');
  });

  it('should build table from json tree', () => {
    const testData: JsonValue = {
      name: 'John',
      age: 30,
    };

    hostComponent.data = testData;
    hostFixture.detectChanges();

    expect(component.table.length).toBe(2);
    expect(component.table[0].key).toBe('name');
    expect(component.table[0].value === 'John').toBe(true);
    expect(component.table[1].key).toBe('age');
    expect(component.table[1].value === 30).toBe(true);
  });

  it('should convert json tree back to object', () => {
    const testData: JsonValue = {
      name: 'John',
      age: 30,
      isActive: true,
      address: {
        city: 'New York',
        zip: '10001',
      },
      tags: ['developer', 'angular'],
    };

    hostComponent.data = testData;
    hostFixture.detectChanges();

    const result = component.jsonTreeToObject(component.jsonTree);
    const resultStr = JSON.stringify(result);
    const expectedStr = JSON.stringify(testData);
    expect(resultStr).toBe(expectedStr);
  });

  it('should handle somethingChanged events', () => {
    const testData: JsonValue = { test: 'value' };
    hostComponent.data = structuredClone(testData);
    hostFixture.detectChanges();

    spyOn(component.dataChange, 'emit');
    spyOn(component, 'rebuildTable').and.callThrough();

    // Test 'add' event
    component.somethingChanged('add');
    expect(component.rebuildTable).toHaveBeenCalled();

    // Test 'sort' event
    component.somethingChanged('sort');
    expect(component.rebuildTable).toHaveBeenCalled();
    expect(component.dataChange.emit).toHaveBeenCalled();

    // Test 'edit' event
    component.somethingChanged('edit');
    expect(component.dataChange.emit).toHaveBeenCalled();

    // Test 'clean' event
    component.somethingChanged('clean');
    expect(component.rebuildTable).toHaveBeenCalled();
  });
});
