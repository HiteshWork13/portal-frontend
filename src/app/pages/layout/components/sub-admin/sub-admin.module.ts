import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { SubAdminComponent } from './sub-admin.component';

@NgModule({
  declarations: [SubAdminComponent],
  imports: [CommonModule, SubAdminRoutingModule, SharedModule],
})
export class SubAdminModule {}
