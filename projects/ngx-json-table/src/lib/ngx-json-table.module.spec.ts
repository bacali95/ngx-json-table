import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxJsonTableModule } from './ngx-json-table.module';
import { NgxJsonTableComponent } from './ngx-json-table.component';
import { Component, ViewChild } from '@angular/core';
import { Settings } from './lib/settings';
import { JsonValue } from './lib/types';
import { By } from '@angular/platform-browser';

interface TestData {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  object: {
    nested: string;
  };
  array: number[];
}

@Component({
  template: `
    <table
      ngx-json-table
      [data]="data"
      [settings]="settings"
      (dataChange)="onDataChange($event)"></table>
  `,
})
class TestHostComponent {
  @ViewChild(NgxJsonTableComponent) jsonTableComponent: NgxJsonTableComponent;

  data: TestData = {
    string: 'Hello World',
    number: 42,
    boolean: true,
    null: null,
    object: {
      nested: 'value',
    },
    array: [1, 2, 3],
  };

  settings: Settings = {
    key: {
      headerText: 'Property',
      width: '30%',
    },
    value: {
      headerText: 'Data',
      width: '70%',
    },
    options: {
      add: true,
      edit: {
        key: true,
        value: true,
      },
      delete: true,
    },
    sortable: true,
    expandAll: true,
  };

  onDataChange(data: JsonValue): void {
    this.data = data as unknown as TestData;
  }
}

describe('NgxJsonTableModule Integration', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

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
  });

  it('should create the host component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should create the NgxJsonTableComponent', () => {
    expect(hostComponent.jsonTableComponent).toBeTruthy();
  });

  it('should render the table headers with custom text', () => {
    const headers = hostFixture.debugElement.queryAll(By.css('th'));

    expect(headers.length).toBe(2);
    expect(headers[0].nativeElement.textContent).toContain('Property');
    expect(headers[1].nativeElement.textContent).toContain('Data');
  });

  it('should render all root level properties', () => {
    const rows = hostFixture.debugElement.queryAll(By.css('.ngx-json-table-row-0'));

    // Should have 6 root level properties
    expect(rows.length).toBe(6);

    // Check if all keys are rendered
    const keys = rows.map(row =>
      row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.trim()
    );
    expect(keys).toContain('⊖array  [3]');
    expect(keys).toContain('>boolean');
    expect(keys).toContain('>null');
    expect(keys).toContain('>number');
    expect(keys).toContain('⊖object  {1}');
    expect(keys).toContain('>string');
  });

  it('should render complex objects with expand/collapse functionality', () => {
    // Find the object row
    const objectRow = hostFixture.debugElement
      .queryAll(By.css('tbody tr'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('object')
      );

    // Should have an expand/collapse icon
    const expandIcon = objectRow.query(By.css('.table-icon'));
    expect(expandIcon).toBeTruthy();

    // Should show "Object" as the value type
    const valueCell = objectRow.query(By.css('[ngx-json-table-value]'));
    expect(valueCell.nativeElement.textContent).toContain('Object');

    // Since expandAll is true, nested properties should be visible
    const nestedRow = hostFixture.debugElement
      .queryAll(By.css('tbody tr'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('nested')
      );
    expect(nestedRow).toBeTruthy();

    // Click to collapse
    expandIcon.nativeElement.click();
    hostFixture.detectChanges();

    // Nested property should now be hidden
    const nestedRowAfterCollapse = hostFixture.debugElement
      .queryAll(By.css('tbody tr'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('nested')
      );
    expect(nestedRowAfterCollapse).toBeFalsy();
  });

  it('should render arrays with correct type and length', () => {
    // Find the array row
    const arrayRow = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-0'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-value')).nativeElement.textContent.includes('Array')
      );

    // Should show "Array[3]" as the value type
    const valueCell = arrayRow.query(By.css('[ngx-json-table-value]'));
    expect(valueCell.nativeElement.textContent).toContain('Array[3]');

    // Should have 3 child rows (one for each array item)
    const arrayItems = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-1'))
      .filter(row => {
        const keyText = row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent;
        return keyText.includes('0') || keyText.includes('1') || keyText.includes('2');
      });
    expect(arrayItems.length).toBe(3);
  });

  it('should allow sorting when sortable is true', () => {
    // Find the sort icon in the header
    const sortIcon = hostFixture.debugElement.query(By.css('.icon-sort'));
    expect(sortIcon).toBeTruthy();

    // Click to sort ascending
    sortIcon.nativeElement.click();
    hostFixture.detectChanges();

    // Get the keys in their current order
    let rows = hostFixture.debugElement.queryAll(By.css('.ngx-json-table-row-0'));
    let keys = rows.map(row =>
      row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.trim()
    );

    // Keys should be in alphabetical order
    expect(keys[0]).toBe('⊖array  [3]');
    expect(keys[1]).toBe('>boolean');
    expect(keys[2]).toBe('>null');
    expect(keys[3]).toBe('>number');
    expect(keys[4]).toBe('⊖object  {1}');
    expect(keys[5]).toBe('>string');

    // Click again to sort descending
    sortIcon.nativeElement.click();
    hostFixture.detectChanges();

    // Get the keys in their new order
    rows = hostFixture.debugElement.queryAll(By.css('.ngx-json-table-row-0'));
    keys = rows.map(row =>
      row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.trim()
    );

    // Keys should be in reverse alphabetical order
    expect(keys[0]).toBe('>string');
    expect(keys[1]).toBe('⊖object  {1}');
    expect(keys[2]).toBe('>number');
    expect(keys[3]).toBe('>null');
    expect(keys[4]).toBe('>boolean');
    expect(keys[5]).toBe('⊖array  [3]');
  });

  it('should allow editing values when edit option is enabled', () => {
    // Find the string value row
    const stringRow = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-0'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('string')
      );

    stringRow.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    hostFixture.detectChanges();

    // Find the edit icon
    const editIcon = stringRow.query(By.css('.icon-edit-child'));

    // Click to enter edit mode
    editIcon.nativeElement.click();
    hostFixture.detectChanges();

    // Should show an input field
    const inputField = stringRow.query(By.css('.ngx-json-table-row-value-input'));
    expect(inputField).toBeTruthy();
    expect(inputField.nativeElement.value).toBe('Hello World');

    // Change the value
    inputField.nativeElement.value = 'Updated Value';
    inputField.nativeElement.dispatchEvent(new InputEvent('keyup', { bubbles: true }));
    hostFixture.detectChanges();

    // Find and click confirm button
    const confirmButton = stringRow.query(By.css('.icon-confirm-edit-child'));
    confirmButton.nativeElement.click();
    hostFixture.detectChanges();

    // Value should be updated in the component
    expect(hostComponent.data.string).toBe('Updated Value');

    // Value should be updated in the UI
    const valueCell = stringRow.query(By.css('.ngx-json-table-row-value'));
    expect(valueCell.nativeElement.textContent).toContain('Updated Value');
  });

  it('should allow adding new properties when add option is enabled', () => {
    // Find the object row
    const objectRow = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-0'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('object')
      );

    objectRow.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    hostFixture.detectChanges();

    // Find the add icon
    const addIcon = objectRow.query(By.css('.icon-add-child'));

    // Initial count of properties
    const initialPropertyCount = Object.keys(hostComponent.data.object).length;

    // Click to add a new property
    addIcon.nativeElement.click();
    hostFixture.detectChanges();

    const valueOption = hostFixture.debugElement.query(By.css('.dropdown-item-value'));

    // Click to add a new property
    valueOption.nativeElement.click();
    hostFixture.detectChanges();

    // Should show an input field
    const inputField = hostFixture.debugElement.query(By.css('.ngx-json-table-row-key-input'));
    expect(inputField).toBeTruthy();
    expect(inputField.nativeElement.value).toBe('');

    // Change the value
    inputField.nativeElement.value = 'newKey';
    inputField.nativeElement.dispatchEvent(new InputEvent('keyup', { bubbles: true }));
    hostFixture.detectChanges();

    // Find and click confirm button
    const confirmButton = hostFixture.debugElement.query(By.css('.icon-confirm-edit-child'));
    confirmButton.nativeElement.click();
    hostFixture.detectChanges();

    // Should have added a new property
    const newPropertyCount = Object.keys(hostComponent.data.object).length;
    expect(newPropertyCount).toBe(initialPropertyCount + 1);

    // New property should be visible in the UI
    const newPropertyRow = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-1'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('newKey')
      );
    expect(newPropertyRow).toBeTruthy();
  });

  it('should allow deleting properties when delete option is enabled', () => {
    // Find the nested property row
    const nestedRow = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-1'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('nested')
      );

    nestedRow.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    hostFixture.detectChanges();

    // Find the delete icon (usually the third icon)
    const deleteIcon = nestedRow.query(By.css('.icon-delete-child'));

    // Click to delete the property
    deleteIcon.nativeElement.click();
    hostFixture.detectChanges();

    // Property should be removed from the data
    expect(hostComponent.data.object.nested).toBeUndefined();

    // Property should be removed from the UI
    const nestedRowAfterDelete = hostFixture.debugElement
      .queryAll(By.css('.ngx-json-table-row-0'))
      .find(row =>
        row.query(By.css('.ngx-json-table-row-key')).nativeElement.textContent.includes('nested')
      );
    expect(nestedRowAfterDelete).toBeFalsy();
  });
});
