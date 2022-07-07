import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HistoryExportRoutingModule } from './history-export-routing.module';
import { HistoryExportComponent } from './history-export.component';


@NgModule({
  declarations: [HistoryExportComponent],
  imports: [
    CommonModule,
    HistoryExportRoutingModule,
    SharedModule
  ]
})
export class HistoryExportModule { }
