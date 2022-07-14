import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryExportDrComponent } from './history-export-dr.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryExportDrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryExportDrRoutingModule { }
