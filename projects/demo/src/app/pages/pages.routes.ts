import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule),
  },
  {
    path: 'documentation',
    loadChildren: () =>
      import('./documentation/documentation.module').then(m => m.DocumentationModule),
  },
];
