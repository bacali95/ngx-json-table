import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxJsonTableComponent } from './ngx-json-table.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { TbodyComponent } from './components/tbody/tbody.component';
import { TrowComponent } from './components/tbody/trow/trow.component';
import { KeyComponent } from './components/tbody/key/key.component';
import { ValueComponent } from './components/tbody/value/value.component';
import { TheadComponent } from './components/thead/thead.component';

const COMPONENTS = [
  TbodyComponent,
  TrowComponent,
  KeyComponent,
  ValueComponent,
  TheadComponent,
  NgxJsonTableComponent,
  SanitizeHtmlPipe,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NgxJsonTableModule {}
