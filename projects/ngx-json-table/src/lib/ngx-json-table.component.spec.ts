import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxJsonTableComponent } from './ngx-json-table.component';
import { NgxJsonTableModule } from './ngx-json-table.module';
import { Settings, iconsPackages } from './lib/settings';
import { JsonValue } from './lib/types';
import { By } from '@angular/platform-browser';

describe('NgxJsonTableComponent', () => {
  let component: NgxJsonTableComponent;
  let fixture: ComponentFixture<NgxJsonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJsonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default settings', () => {
    expect(component.defaultSettings).toBeDefined();
    expect(component.defaultSettings.key.headerText).toBe('Key');
    expect(component.defaultSettings.value.headerText).toBe('Value');
    expect(component.defaultSettings.options.add).toBe(false);
    expect(component.defaultSettings.options.edit.key).toBe(false);
    expect(component.defaultSettings.options.edit.value).toBe(false);
    expect(component.defaultSettings.options.delete).toBe(false);
    expect(component.defaultSettings.sortable).toBe(false);
    expect(component.defaultSettings.expandAll).toBe(false);
    expect(component.defaultSettings.loadFromFile).toBe(false);
  });

  it('should use basic icons by default', () => {
    expect(component.defaultSettings.icons).toEqual(iconsPackages.basic);
  });

  it('should emit dataChange event when data changes', () => {
    const testData: JsonValue = { test: 'value' };
    spyOn(component.dataChange, 'emit');

    component.data = testData;
    component.settings = {
      options: {
        edit: {
          key: true,
          value: true,
        },
        delete: true,
      },
    };
    component.ngOnChanges({
      settings: {
        currentValue: component.settings,
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.detectChanges();

    expect(component.settings.options.edit.key).toBe(true);
    expect(component.settings.options.edit.value).toBe(true);
    expect(component.settings.options.delete).toBe(true);

    fixture.debugElement
      .query(By.css('.ngx-json-table-row-key'))
      .nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.delete-child')).nativeElement.click();

    expect(component.dataChange.emit).toHaveBeenCalled();
  });

  it('should merge custom settings with default settings', () => {
    const customSettings: Settings = {
      key: {
        headerText: 'Custom Key',
        width: '30%',
      },
      sortable: true,
    };

    component.settings = customSettings;
    component.ngOnChanges({
      settings: {
        currentValue: customSettings,
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.defaultSettings.key.headerText).toBe('Custom Key');
    expect(component.defaultSettings.key.width).toBe('30%');
    expect(component.defaultSettings.sortable).toBe(true);
    // Default values should be preserved for properties not specified in custom settings
    expect(component.defaultSettings.value.headerText).toBe('Value');
  });

  it('should switch icon package when specified in settings', () => {
    const customSettings: Settings = {
      iconPackage: 'font-awesome',
    };

    component.settings = customSettings;
    component.ngOnChanges({
      settings: {
        currentValue: customSettings,
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.defaultSettings.icons).toEqual(iconsPackages['font-awesome']);
  });
});
