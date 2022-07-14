import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HistoryExportDrRoutingModule } from './history-export-dr-routing.module';
import { HistoryExportDrComponent } from './history-export-dr.component';


@NgModule({
  declarations: [HistoryExportDrComponent],
  imports: [
    CommonModule,
    HistoryExportDrRoutingModule,
    SharedModule
  ]
})
export class HistoryExportDrModule { }
