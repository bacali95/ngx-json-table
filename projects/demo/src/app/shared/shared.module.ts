import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxJsonTableModule } from 'ngx-json-table';

import { HeaderComponent } from './components/header/header.component';
import { BasicExampleDataComponent } from './components/basic-example/basic-example-data.component';
import { BasicExampleComponent } from './components/basic-example/basic-example.component';

const SHARED_COMPONENTS = [HeaderComponent, BasicExampleComponent, BasicExampleDataComponent];

@NgModule({
  imports: [RouterModule, CommonModule, NgxJsonTableModule],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_COMPONENTS],
})
export class SharedModule {}
