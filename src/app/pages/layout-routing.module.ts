import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
