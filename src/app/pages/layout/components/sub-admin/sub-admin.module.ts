import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { SubAdminComponent } from './sub-admin.component';

@NgModule({
  declarations: [SubAdminComponent],
  imports: [CommonModule, SubAdminRoutingModule],
})
export class SubAdminModule {}
