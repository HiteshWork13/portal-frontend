import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/layout/components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/layout/components/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      {
        path: 'sub-admin',
        loadChildren: () =>
          import('./pages/layout/components/sub-admin/sub-admin.module').then(
            (m) => m.SubAdminModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/layout/components/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
