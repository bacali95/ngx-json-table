import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2JsonTableComponent } from './ng2-json-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    Ng2JsonTableComponent,
  ],
  exports: [
    Ng2JsonTableComponent,
  ],
})
export class Ng2JsonTableModule {
}
