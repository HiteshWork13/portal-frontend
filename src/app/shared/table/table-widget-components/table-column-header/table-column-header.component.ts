import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from '../../table.model';

@Component({
  selector: 'app-table-column-header',
  templateUrl: './table-column-header.component.html',
  styleUrls: ['./table-column-header.component.scss'],
})
export class TableColumnHeaderComponent implements OnInit {
  @Input() index: number;
  @Input() column: Column;
  @Output() sortColumnChanges = new EventEmitter();
  private rotate = { asc: 'desc', desc: '', '': 'asc' };
  constructor() {}

  ngOnInit(): void {}

  sortColumn(index: any) {
    this.column.sortOrder = this.rotate[this.column.sortOrder] as
      | 'asc'
      | 'desc'
      | '';
    this.sortColumnChanges.emit({ index, sortOrder: this.column.sortOrder });
  }
}
