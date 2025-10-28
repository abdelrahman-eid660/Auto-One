import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes.module').then(
        (user) => user.UserModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes.module').then(
        (admin) => admin.AdminModule
      ),
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];
