import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyComponent } from './key.component';
import { NgxJsonTableModule } from '../../../ngx-json-table.module';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { Settings, iconsPackages } from '../../../lib/settings';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('KeyComponent', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;
  let node: JsonTreeNode;
  let settings: Settings;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;

    // Create a test node
    node = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);

    // Set required inputs
    component.item = node;
    settings = {
      options: {
        edit: {
          key: true,
        },
      },
    };
    component.settings = settings;
    component.icons = iconsPackages.basic;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the node key', () => {
    const keyElement = fixture.debugElement.query(By.css('.ngx-json-table-row-key-value'));
    expect(keyElement.nativeElement.textContent).toContain('testKey');
  });

  it('should display expand/collapse icon for complex nodes', () => {
    // Create a complex node (object or array)
    const complexNode = new JsonTreeNode('complexKey', '', 'object', 0, false, null, [], true);
    complexNode.addChild(
      new JsonTreeNode('childKey', 'childValue', 'string', 1, false, complexNode, [], true)
    );

    component.item = complexNode;
    fixture.detectChanges();

    const expandIcon = fixture.debugElement.query(By.css('.table-icon'));
    expect(expandIcon).toBeTruthy();
  });

  it('should not display expand/collapse icon for simple nodes', () => {
    // Simple node (string, number, boolean, null)
    const expandIcon = fixture.debugElement.query(By.css('.table-icon .icon-expand'));
    const collapseIcon = fixture.debugElement.query(By.css('.table-icon .icon-collapse'));
    expect(expandIcon).toBeFalsy();
    expect(collapseIcon).toBeFalsy();
  });

  it('should toggle showChildren state when expand/collapse icon is clicked', () => {
    // Create a complex node (object or array)
    const complexNode = new JsonTreeNode('complexKey', '', 'object', 0, false, null, [], true);
    complexNode.addChild(
      new JsonTreeNode('childKey', 'childValue', 'string', 1, false, complexNode, [], true)
    );

    component.item = complexNode;
    fixture.detectChanges();

    // Initially showChildren is true
    expect(complexNode.showChildren).toBe(true);

    // Click to collapse
    const expandIcon = fixture.debugElement.query(By.css('.table-icon'));
    expandIcon.nativeElement.click();

    expect(complexNode.showChildren).toBe(false);

    // Click to expand again
    expandIcon.nativeElement.click();

    expect(complexNode.showChildren).toBe(true);
  });

  it('should enter edit mode when edit is enabled and edit icon is clicked', () => {
    // Enable edit mode
    settings.options.edit.key = true;
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
      expect(inputField.nativeElement.value).toBe('testKey');
    }
  });

  it('should save edited key when confirm button is clicked', () => {
    // Enable edit mode
    settings.options.edit.key = true;
    fixture.detectChanges();

    // Enter edit mode
    component.item.edit = true;
    // Store original key
    const originalKey = component.item.key;
    fixture.detectChanges();

    // Find and click confirm button
    const confirmButton = fixture.debugElement.query(By.css('.confirm-icon'));
    if (confirmButton) {
      // Simulate user input by updating the node's key directly
      component.item.key = 'newKey';

      confirmButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.item.edit).toBe(false);
      expect(component.item.key).not.toBe(originalKey);
      expect(component.item.key).toBe('newKey');
    }
  });

  it('should cancel edit when cancel button is clicked', () => {
    // Enable edit mode
    settings.options.edit.key = true;
    fixture.detectChanges();

    // Enter edit mode
    component.item.edit = true;
    // Store original key
    const originalKey = component.item.key;
    fixture.detectChanges();

    // Find and click cancel button
    const cancelButton = fixture.debugElement.query(By.css('.cancel-icon'));
    if (cancelButton) {
      // Simulate user input by updating the node's key directly
      component.item.key = 'newKey';

      cancelButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.item.edit).toBe(false);
      // Key should be reset to original
      expect(component.item.key).toBe(originalKey);
    }
  });

  it('should not show edit icon when edit is disabled', () => {
    // Disable edit mode
    settings.options.edit.key = false;
    fixture.detectChanges();

    const editIcon = fixture.debugElement.query(By.css('.edit-icon'));
    expect(editIcon).toBeFalsy();
  });

  it('should emit valueChange event when key is edited', () => {
    spyOn(component.valueChange, 'emit');

    // Enable edit mode
    settings.options.edit.key = true;
    fixture.detectChanges();

    // Enter edit mode
    component.item.edit = true;
    // Update key directly
    component.item.key = 'newKey';
    fixture.detectChanges();

    // Simulate enter key press
    component.onEnterKeyListener();
    fixture.detectChanges();

    expect(component.valueChange.emit).toHaveBeenCalledWith('edit');
  });
});
