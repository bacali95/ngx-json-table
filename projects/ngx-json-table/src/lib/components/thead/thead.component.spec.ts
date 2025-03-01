import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TheadComponent } from './thead.component';
import { NgxJsonTableModule } from '../../ngx-json-table.module';
import { iconsPackages } from '../../lib/settings';
import { JsonTreeNode } from '../../lib/json-tree-node';
import { By } from '@angular/platform-browser';

describe('THeadComponent', () => {
  let component: TheadComponent;
  let fixture: ComponentFixture<TheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheadComponent);
    component = fixture.componentInstance;

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
    const sortIconElement = fixture.debugElement.query(By.css('.table-icon'));
    expect(sortIconElement).toBeTruthy();
  });

  it('should not show sort icons when sortable is false', () => {
    component.settings.sortable = false;
    fixture.detectChanges();

    const sortIconElement = fixture.debugElement.query(By.css('.table-icon .icon-not-sorted'));
    expect(sortIconElement).toBeFalsy();
  });

  it('should emit sort event when sort icon is clicked', () => {
    spyOn(component.sortDirectionChange, 'emit');

    const sortIconElement = fixture.debugElement.query(By.css('.table-icon'));
    sortIconElement.nativeElement.click();

    expect(component.sortDirectionChange.emit).toHaveBeenCalled();
  });

  it('should toggle sort direction when sort icon is clicked', () => {
    // Initial state
    expect(component.settings.sortDirection).toBeUndefined();

    // First click - should set to 'asc'
    const sortIconElement = fixture.debugElement.query(By.css('.table-icon'));
    sortIconElement.nativeElement.click();

    expect(component.settings.sortDirection).toBe('asc');

    // Second click - should set to 'desc'
    sortIconElement.nativeElement.click();

    expect(component.settings.sortDirection).toBe('desc');

    // Third click - should set back to 'asc'
    sortIconElement.nativeElement.click();

    expect(component.settings.sortDirection).toBe('asc');
  });

  it('should set root property', () => {
    const root = new JsonTreeNode('root', '', 'object', -1, false, null, [], true);
    component.root = root;

    expect(component.root).toBe(root);
  });

  it('should use custom icons when provided', () => {
    component.icons = iconsPackages['font-awesome'];
    fixture.detectChanges();

    const sortIconElement = fixture.debugElement.query(By.css('.fa'));
    expect(sortIconElement).toBeTruthy();
  });
});
