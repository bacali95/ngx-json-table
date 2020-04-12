import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxJsonTableComponent } from './ngx-json-table.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { NgxJsonTableTbodyComponent } from './components/tbody/tbody.component';
import { NgxJsonTableTrowComponent } from './components/tbody/trow/trow.component';
import { NgxJsonTableKeyComponent } from './components/tbody/key/key.component';
import { NgxJsonTableValueComponent } from './components/tbody/value/value.component';
import { NgxJsonTableTheadComponent } from './components/thead/thead.component';

const COMPONENTS = [
  NgxJsonTableTbodyComponent,
  NgxJsonTableTrowComponent,
  NgxJsonTableKeyComponent,
  NgxJsonTableValueComponent,
  NgxJsonTableTheadComponent,
  NgxJsonTableComponent,
  SanitizeHtmlPipe
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NgxJsonTableModule {
}
