import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxJsonTableTbodyComponent } from './tbody.component';
import { NgxJsonTableTrowComponent } from './trow/trow.component';

const COMPONENTS = [
  NgxJsonTableTbodyComponent,
  NgxJsonTableTrowComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule
  ]
})
export class NgxJsonTableTbodyModule {
}
