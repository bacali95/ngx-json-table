import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2JsonTableModule } from 'ng2-json-table';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    Ng2JsonTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
