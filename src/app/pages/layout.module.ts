import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartialsModule } from '../shared/partials/partials.module';

import { LayoutComponent } from './layout/layout.component';
import { DashboardModule } from './layout/components/dashboard/dashboard.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DashboardModule,
    SharedModule,
    PartialsModule
  ]
})
export class LayoutModule {}
