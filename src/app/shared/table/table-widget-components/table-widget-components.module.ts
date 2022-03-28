import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableColumnHeaderComponent } from './table-column-header/table-column-header.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';

@NgModule({
  declarations: [
    TableColumnHeaderComponent,
    TablePaginationComponent,
    TableHeaderComponent,
  ],
  imports: [CommonModule],
  exports: [TableColumnHeaderComponent, TableHeaderComponent],
})
export class TableWidgetComponentsModule {}
