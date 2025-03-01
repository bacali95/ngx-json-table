import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxJsonTableModule } from 'ngx-json-table';
import { HIGHLIGHT_OPTIONS, type HighlightJSOptions } from 'ngx-highlightjs';

import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ScrollPositionDirective } from './theme/directives/scrollPosition.directive';

@NgModule({
  declarations: [AppComponent, ScrollPositionDirective],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgxJsonTableModule,
    PagesModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        languages: {
          bash: () => import('highlight.js/lib/languages/bash'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
        },
      } satisfies HighlightJSOptions,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
