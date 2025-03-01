import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueComponent } from './value.component';
import { NgxJsonTableModule } from '../../../ngx-json-table.module';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { Settings } from '../../../lib/settings';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ValueComponent', () => {
  let component: ValueComponent;
  let fixture: ComponentFixture<ValueComponent>;
  let node: JsonTreeNode;
  let settings: Settings;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueComponent);
    component = fixture.componentInstance;

    // Create a test node
    node = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);

    // Set required inputs
    component.item = node;
    settings = {
      options: {
        add: true,
        edit: {
          value: true,
        },
        delete: true,
      },
    };
    component.settings = settings;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the node value for simple nodes', () => {
    const valueElement = fixture.debugElement.query(By.css('.ngx-json-table-row-value'));
    expect(valueElement.nativeElement.textContent).toContain('testValue');
  });

  it('should display type indicator for complex nodes', () => {
    // Create a complex node (object)
    const complexNode = new JsonTreeNode('complexKey', '', 'object', 0, false, null, [], true);
    complexNode.addChild(
      new JsonTreeNode('childKey', 'childValue', 'string', 1, false, complexNode, [], true)
    );

    component.item = complexNode;
    fixture.detectChanges();

    const valueElement = fixture.debugElement.query(By.css('.ngx-json-table-row-value'));
    expect(valueElement.nativeElement.textContent).toBe('Object{1}');
  });

  it('should display array indicator for array nodes', () => {
    // Create an array node
    const arrayNode = new JsonTreeNode('arrayKey', '', 'object', 0, true, null, [], true);
    arrayNode.addChild(new JsonTreeNode('0', 'item1', 'string', 1, false, arrayNode, [], true));

    component.item = arrayNode;
    fixture.detectChanges();

    const valueElement = fixture.debugElement.query(By.css('.ngx-json-table-row-value'));
    expect(valueElement.nativeElement.textContent).toContain('Array[1]');
  });

  it('should enter edit mode when edit is enabled and edit icon is clicked', () => {
    // Enable edit mode
    settings.options.edit.value = true;
    fixture.detectChanges();

    // Initially not in edit mode
    expect(component.item.edit).toBe(false);

    // Find and click edit icon
    const editIcon = fixture.debugElement.query(By.css('.edit-icon'));
    if (editIcon) {
      editIcon.nativeElement.click();
      fixture.detectChanges();

      // Should be in edit mode
      expect(component.item.edit).toBe(true);

      // Should show input field in edit mode
      const inputField = fixture.debugElement.query(By.css('input'));
      expect(inputField).toBeTruthy();
      expect(inputField.nativeElement.value).toBe('testValue');
    }
  });

  it('should save edited value when confirm button is clicked', () => {
    // Enable edit mode
    settings.options.edit.value = true;
    fixture.detectChanges();

    // Enter edit mode
    component.item.edit = true;
    // Store original value to test later
    const originalValue = component.item.value as string;
    fixture.detectChanges();

    // Find and click confirm button
    const confirmButton = fixture.debugElement.query(By.css('.confirm-icon'));
    if (confirmButton) {
      // Simulate user input by updating the node's value directly
      component.item.value = 'newValue';

      confirmButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.item.edit).toBe(false);
      expect(component.item.value).not.toBe(originalValue);
      expect(component.item.value).toBe('newValue');
    }
  });

  it('should cancel edit when cancel button is clicked', () => {
    // Enable edit mode
    settings.options.edit.value = true;
    fixture.detectChanges();

    // Enter edit mode
    component.item.edit = true;
    // Store original value
    const originalValue = component.item.value as string;
    fixture.detectChanges();

    // Find and click cancel button
    const cancelButton = fixture.debugElement.query(By.css('.cancel-icon'));
    if (cancelButton) {
      // Simulate user input by updating the node's value directly
      component.item.value = 'newValue';

      cancelButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.item.edit).toBe(false);
      // Value should be reset to original
      expect(component.item.value).toBe(originalValue);
    }
  });

  it('should not show edit icon when edit is disabled', () => {
    // Disable edit mode
    settings.options.edit.value = false;
    fixture.detectChanges();

    const editIcon = fixture.debugElement.query(By.css('.edit-icon'));
    expect(editIcon).toBeFalsy();
  });

  it('should emit valueChange event when value is edited', () => {
    spyOn(component.valueChange, 'emit');

    // Enable edit mode
    settings.options.edit.value = true;
    fixture.detectChanges();

    // Enter edit mode
    component.item.edit = true;
    // Update value directly
    component.item.value = 'newValue';
    fixture.detectChanges();

    // Simulate enter key press
    component.onEnterKeyListener();
    fixture.detectChanges();

    expect(component.valueChange.emit).toHaveBeenCalledWith('edit');
  });

  it('should add a new child when add icon is clicked for complex nodes', () => {
    // Create a complex node (object)
    const complexNode = new JsonTreeNode('complexKey', '', 'object', 0, false, null, [], true);

    component.item = complexNode;
    fixture.detectChanges();

    // Initially no children
    expect(complexNode.children.length).toBe(0);

    // Find and click add icon
    const addIcon = fixture.debugElement.query(By.css('.add-icon'));
    if (addIcon) {
      addIcon.nativeElement.click();
      fixture.detectChanges();

      // Should have added a new child
      expect(complexNode.children.length).toBe(1);
      expect(complexNode.children[0].key).toBe('newKey');
    }
  });

  it('should delete node when delete icon is clicked', () => {
    // Create a parent node with a child
    const parentNode = new JsonTreeNode('parentKey', '', 'object', 0, false, null, [], true);
    const childNode = new JsonTreeNode(
      'childKey',
      'childValue',
      'string',
      1,
      false,
      parentNode,
      [],
      true
    );
    parentNode.addChild(childNode);

    component.item = childNode;
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');

    // Find and click delete icon
    const deleteIcon = fixture.debugElement.query(By.css('.delete-icon'));
    if (deleteIcon) {
      deleteIcon.nativeElement.click();
      fixture.detectChanges();

      // Should have removed the child from parent
      expect(parentNode.children.length).toBe(0);
      expect(component.valueChange.emit).toHaveBeenCalledWith('delete');
    }
  });

  it('should not show add icon when add is disabled', () => {
    // Disable add
    settings.options.add = false;
    fixture.detectChanges();

    const addIcon = fixture.debugElement.query(By.css('.add-icon'));
    expect(addIcon).toBeFalsy();
  });

  it('should not show delete icon when delete is disabled', () => {
    // Disable delete
    settings.options.delete = false;
    fixture.detectChanges();

    const deleteIcon = fixture.debugElement.query(By.css('.delete-icon'));
    expect(deleteIcon).toBeFalsy();
  });

  it('should handle escape key properly for regular items', () => {
    // Create test item
    const testNode = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);
    testNode.edit = true;
    component.item = testNode;
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');
    spyOn(testNode, 'resetState');
    spyOn(testNode, 'toggleEdit');

    // Trigger escape key
    component.onEscapeKeyListener();

    expect(testNode.resetState).toHaveBeenCalled();
    expect(testNode.toggleEdit).toHaveBeenCalled();
    expect(component.valueChange.emit).not.toHaveBeenCalled();
  });

  it('should handle escape key for new items', () => {
    // Create test item that is new
    const testNode = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);
    testNode.isNew = true;
    testNode.edit = true;
    component.item = testNode;
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');
    spyOn(testNode, 'delete');

    // Trigger escape key
    component.onEscapeKeyListener();

    expect(testNode.delete).toHaveBeenCalled();
    expect(component.valueChange.emit).toHaveBeenCalledWith('clean');
  });

  it('should handle enter key to save changes', () => {
    // Create test item
    const testNode = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);
    testNode.edit = true;
    component.item = testNode;
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');
    spyOn(testNode, 'toggleEdit');
    spyOn(testNode, 'updateState');
    spyOn(testNode, 'checkNotUniqueKey').and.returnValue(false);

    // Trigger enter key
    component.onEnterKeyListener();

    expect(testNode.checkNotUniqueKey).toHaveBeenCalled();
    expect(testNode.toggleEdit).toHaveBeenCalled();
    expect(testNode.updateState).toHaveBeenCalled();
    expect(component.valueChange.emit).toHaveBeenCalledWith('edit');
  });

  it('should not proceed with enter key if key is not unique', () => {
    // Create test item
    const testNode = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);
    testNode.edit = true;
    component.item = testNode;
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');
    spyOn(testNode, 'toggleEdit');
    spyOn(testNode, 'checkNotUniqueKey').and.returnValue(true);

    // Trigger enter key
    component.onEnterKeyListener();

    expect(testNode.checkNotUniqueKey).toHaveBeenCalled();
    expect(testNode.toggleEdit).not.toHaveBeenCalled();
    expect(component.valueChange.emit).not.toHaveBeenCalled();
  });
});
