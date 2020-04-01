import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxJsonTableComponent } from './ngx-json-table.component';
import { NgxJsonTableTbodyModule } from './components/tbody/tbody.module';
import { NgxJsonTableTheadModule } from './components/thead/thead.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxJsonTableTbodyModule,
    NgxJsonTableTheadModule,
  ],
  declarations: [
    NgxJsonTableComponent,
  ],
  exports: [
    NgxJsonTableComponent,
  ],
})
export class NgxJsonTableModule {
}
