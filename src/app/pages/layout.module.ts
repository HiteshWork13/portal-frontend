import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartialsModule } from '../shared/partials/partials.module';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthenticationModule } from './components/authentication/authentication.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DashboardModule,
    AuthenticationModule,
    SharedModule,
    PartialsModule
  ],
})
export class LayoutModule {}
