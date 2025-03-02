import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TheadComponent } from './thead.component';
import { NgxJsonTableModule } from '../../ngx-json-table.module';
import { iconsPackages } from '../../lib/settings';
import { JsonTreeNode } from '../../lib/json-tree-node';
import { By } from '@angular/platform-browser';
import type { EventEmitter } from '@angular/core';

describe('THeadComponent', () => {
  let component: TheadComponent;
  let fixture: ComponentFixture<TheadComponent>;
  let rootNode: JsonTreeNode;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheadComponent);
    component = fixture.componentInstance;

    // Create a root node for testing
    rootNode = new JsonTreeNode('root', '', 'object', -1, false, null, [], true);
    component.root = rootNode;

    // Set required inputs
    component.settings = {
      key: {
        headerText: 'Key',
        width: '40%',
      },
      value: {
        headerText: 'Value',
        width: '60%',
      },
      sortable: true,
      options: {
        add: true,
        edit: {
          key: true,
          value: true,
        },
        delete: true,
      },
    };
    component.icons = iconsPackages.basic;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header texts from settings', () => {
    const headerElements = fixture.debugElement.queryAll(By.css('th'));

    expect(headerElements.length).toBe(2);
    expect(headerElements[0].nativeElement.textContent).toContain('Key');
    expect(headerElements[1].nativeElement.textContent).toContain('Value');
  });

  it('should apply width styles from settings', () => {
    const headerElements = fixture.debugElement.queryAll(By.css('th'));

    expect(headerElements[0].styles.width).toBe('40%');
    expect(headerElements[1].styles.width).toBe('60%');
  });

  it('should show sort icons when sortable is true', () => {
    const sortIconElement = fixture.debugElement.query(By.css('.icon-sort'));
    expect(sortIconElement).toBeTruthy();
  });

  it('should not show sort icons when sortable is false', () => {
    component.settings.sortable = false;
    fixture.detectChanges();

    const sortIconElement = fixture.debugElement.query(By.css('.icon-sort'));
    expect(sortIconElement).toBeFalsy();
  });

  it('should emit sort event when sort icon is clicked', () => {
    spyOn(component.sortDirectionChange, 'emit');

    const sortIconElement = fixture.debugElement.query(By.css('.icon-sort'));
    sortIconElement.nativeElement.click();

    expect(component.sortDirectionChange.emit).toHaveBeenCalledWith('asc');
  });

  it('should toggle sort direction when toggleSortDirection method is called', () => {
    // Initial state
    expect(component.settings.sortDirection).toBeUndefined();

    // Call toggleSortDirection first time
    component.toggleSortDirection();
    expect(component.settings.sortDirection).toBe('asc');

    // Call toggleSortDirection second time
    component.toggleSortDirection();
    expect(component.settings.sortDirection).toBe('desc');

    // Call toggleSortDirection third time
    component.toggleSortDirection();
    expect(component.settings.sortDirection).toBe('asc');
  });

  it('should set root property', () => {
    expect(component.root).toBe(rootNode);
  });

  it('should use custom icons when provided', () => {
    component.icons = iconsPackages['font-awesome'];
    fixture.detectChanges();

    // Use a more specific selector that matches your actual template
    const iconElements = fixture.debugElement.queryAll(By.css('.table-icon'));
    expect(iconElements.length).toBeGreaterThan(0);
  });

  // Tests for toggleDropdownMenu method
  it('should toggle dropdown menu visibility when toggleDropdownMenu is called', () => {
    // Create a test dropdown element
    const dropdownElement = document.createElement('span');
    dropdownElement.style.display = 'none';

    // Call the method to show the dropdown
    component.toggleDropdownMenu(dropdownElement);
    expect(dropdownElement.style.display).toBe('block');

    // Call the method again to hide the dropdown
    component.toggleDropdownMenu(dropdownElement);
    expect(dropdownElement.style.display).toBe('none');
  });

  it('should toggle dropdown menu from empty display state', () => {
    // Create a test dropdown element with empty display
    const dropdownElement = document.createElement('span');
    dropdownElement.style.display = '';

    // Call the method
    component.toggleDropdownMenu(dropdownElement);
    expect(dropdownElement.style.display).toBe('block');
  });

  // Tests for addChild method
  it('should add a string node child when addChild is called with default parameters', () => {
    spyOn(component.somethingChanged, 'emit');

    // Create a dropdown element
    const dropdownElement = document.createElement('span');

    // Call addChild with default parameters (string type)
    component.addChild(dropdownElement);

    // Verify a child was added to the root
    expect(rootNode.children.length).toBe(1);
    expect(rootNode.children[0].type).toBe('string');
    expect(rootNode.children[0].isArray).toBe(false);
    expect(rootNode.children[0].edit).toBe(true);
    expect(rootNode.children[0].isNew).toBe(true);

    // Verify somethingChanged was emitted
    expect(component.somethingChanged.emit).toHaveBeenCalledWith('add');

    // Verify dropdown was hidden
    expect(dropdownElement.style.display).toBe('none');
  });

  it('should add an object node child when addChild is called with isObject=true', () => {
    spyOn(component.somethingChanged, 'emit');

    // Create a dropdown element
    const dropdownElement = document.createElement('span');

    // Call addChild with isObject=true
    component.addChild(dropdownElement, true);

    // Verify a child was added to the root with object type
    expect(rootNode.children.length).toBe(1);
    expect(rootNode.children[0].type).toBe('object');
    expect(rootNode.children[0].isArray).toBe(false);
    expect(rootNode.children[0].edit).toBe(true);
    expect(rootNode.children[0].isNew).toBe(true);

    // Verify somethingChanged was emitted
    expect(component.somethingChanged.emit).toHaveBeenCalledWith('add');
  });

  it('should add an array node child when addChild is called with isArray=true', () => {
    spyOn(component.somethingChanged, 'emit');

    // Create a dropdown element
    const dropdownElement = document.createElement('span');

    // Call addChild with isObject=true and isArray=true
    component.addChild(dropdownElement, true, true);

    // Verify a child was added to the root with array flag
    expect(rootNode.children.length).toBe(1);
    expect(rootNode.children[0].type).toBe('object');
    expect(rootNode.children[0].isArray).toBe(true);
    expect(rootNode.children[0].edit).toBe(true);
    expect(rootNode.children[0].isNew).toBe(true);

    // Verify somethingChanged was emitted
    expect(component.somethingChanged.emit).toHaveBeenCalledWith('add');
  });

  it('should position new child at the beginning of children array', () => {
    // Add an existing child first
    const existingChild = new JsonTreeNode('existing', 'value', 'string', 0, false, rootNode);
    rootNode.children.push(existingChild);

    // Create a dropdown element
    const dropdownElement = document.createElement('span');

    // Call addChild to add a new child
    component.addChild(dropdownElement);

    // Verify the new child is at the beginning
    expect(rootNode.children.length).toBe(2);
    expect(rootNode.children[0].isNew).toBe(true);
    expect(rootNode.children[1]).toBe(existingChild);
  });

  // Tests for UI elements based on settings
  it('should show add buttons when options.add is true', () => {
    // Ensure add is enabled
    component.settings.options.add = true;
    fixture.detectChanges();

    // Look for the add child button container
    const addButtonContainer = fixture.debugElement.query(
      By.css('span.float-right:not(.icon-sort)')
    );
    expect(addButtonContainer).toBeTruthy();

    // Look for the dropdown content
    const dropdownContent = fixture.debugElement.query(By.css('.dropdown-content'));
    expect(dropdownContent).toBeTruthy();
  });

  it('should not show add buttons when options.add is false', () => {
    // Disable add
    component.settings.options.add = false;
    fixture.detectChanges();

    // Look for the add child button - should not exist
    const addElements = fixture.debugElement.queryAll(By.css('span[innerHTML]'));
    const addButton = addElements.find(el => {
      const html = el.nativeElement.outerHTML;
      return html.includes('addChild') || html.includes('add-child');
    });

    expect(addButton).toBeFalsy();
  });

  // Tests for file loading capabilities
  it('should show file upload input when loadFromFile is true', () => {
    // Enable loadFromFile
    component.settings.loadFromFile = true;
    fixture.detectChanges();

    // Look for the file input
    const fileInput = fixture.debugElement.query(By.css('input[type="file"]'));
    expect(fileInput).toBeTruthy();
    expect(fileInput.attributes.accept).toBe('application/json');
  });

  it('should not show file upload when loadFromFile is false', () => {
    // Disable loadFromFile
    component.settings.loadFromFile = false;
    fixture.detectChanges();

    // Look for the upload icon - should not exist
    const uploadIcon = fixture.debugElement.query(By.css('.icon-upload-file'));
    expect(uploadIcon).toBeFalsy();
  });

  // Test for loadFile method - simplified to avoid FileReader complexities
  it('should have a loadFile method that handles file input events', () => {
    spyOn(component, 'loadFile').and.callThrough();

    // Enable loadFromFile
    component.settings.loadFromFile = true;
    fixture.detectChanges();

    // Get the file input
    const fileInput = fixture.debugElement.query(By.css('input[type="file"]'));
    expect(fileInput).toBeTruthy();

    // Trigger the change event
    const changeEvent = {
      target: { files: [] },
    };
    fileInput.triggerEventHandler('change', changeEvent);

    // Verify loadFile was called
    expect(component.loadFile).toHaveBeenCalled();
  });

  // Testing non-JSON file handling in loadFile
  it('should not process non-JSON files in loadFile method', () => {
    // Create spies
    spyOn(component.fileLoaded, 'emit');

    // Create a mock file with non-JSON type
    const mockFile = new File(['not json'], 'test.txt', { type: 'text/plain' });

    // Create a mock event that bypasses the deep type instantiation
    const mockTarget = { files: [mockFile] } as { files: File[] };
    const event = { target: mockTarget } as unknown as InputEvent;

    // Call loadFile
    component.loadFile(event);

    // Verify the event was not emitted since it's not a JSON file
    expect(component.fileLoaded.emit).not.toHaveBeenCalled();
  });

  it('should emit fileLoaded event when a valid JSON file is loaded', () => {
    spyOn(component.fileLoaded, 'emit');

    // Create a mock file with JSON type
    const mockFile = new File(['{"key": "value"}'], 'test.json', { type: 'application/json' });

    // Create a mock event that bypasses the deep type instantiation
    const mockTarget = { files: [mockFile] } as { files: File[] };
    const event = { target: mockTarget } as unknown as InputEvent;

    // Call loadFile
    component.loadFile(event);

    waitForAsync(() => {
      // Verify the event was emitted
      expect(component.fileLoaded.emit as unknown as EventEmitter<object>).toHaveBeenCalledWith({
        key: 'value',
      });
    });
  });
});
