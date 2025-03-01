import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrowComponent } from './trow.component';
import { NgxJsonTableModule } from '../../../ngx-json-table.module';
import { JsonTreeNode } from '../../../lib/json-tree-node';
import { Settings, iconsPackages } from '../../../lib/settings';
import { By } from '@angular/platform-browser';

describe('TRowComponent', () => {
  let component: TrowComponent;
  let fixture: ComponentFixture<TrowComponent>;
  let node: JsonTreeNode;
  let settings: Settings;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxJsonTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrowComponent);
    component = fixture.componentInstance;

    // Create a test node
    node = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);

    // Set required inputs
    component.item = node;
    settings = {
      key: {
        width: '100px',
      },
      value: {
        width: '100px',
      },
      options: {
        add: true,
        edit: {
          key: true,
          value: true,
        },
        delete: true,
      },
    };
    component.settings = settings;
    component.icons = iconsPackages.basic;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render key and value components', () => {
    const keyComponent = fixture.debugElement.query(By.css('[ngx-json-table-key]'));
    const valueComponent = fixture.debugElement.query(By.css('[ngx-json-table-value]'));

    expect(keyComponent).toBeTruthy();
    expect(valueComponent).toBeTruthy();
  });

  it('should apply indentation based on node level', () => {
    // Set node level
    node.level = 2;
    fixture.detectChanges();

    const keyComponent = fixture.debugElement.query(By.css('.ngx-json-table-row-key'));

    // Check if padding-left style is applied
    expect(keyComponent.styles['margin-left']).toBe('40px'); // 20px * level
  });

  it('should emit valueChange event when key component emits valueChange', () => {
    spyOn(component.valueChange, 'emit');

    // Trigger valueChange event from key component
    const keyComponent = fixture.debugElement.query(By.css('[ngx-json-table-key]'));
    keyComponent.triggerEventHandler('valueChange', 'edit');

    expect(component.valueChange.emit).toHaveBeenCalledWith('edit');
  });

  it('should emit valueChange event when value component emits valueChange', () => {
    spyOn(component.valueChange, 'emit');

    // Trigger valueChange event from value component
    const valueComponent = fixture.debugElement.query(By.css('[ngx-json-table-value]'));
    valueComponent.triggerEventHandler('valueChange', 'edit');

    expect(component.valueChange.emit).toHaveBeenCalledWith('edit');
  });
});
