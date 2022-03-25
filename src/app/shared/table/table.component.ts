import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() listOfData: any;
  public readonly tableId =
    Math.round(Math.random() * 10000000000) + Date.now();
  @Input() Config: Config;
  @Input() Data: Array<any>;
  clickedRowIndex: number;
  @Output() onCellClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  selectAll: Boolean = false;
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();
  public readonly resizableEdge = {
    top: false,
    bottom: false,
    left: true,
    right: true,
  };
  @Input() Mode: 'View' | 'Normal' = 'Normal';
  @Output() onSearchColumn: EventEmitter<any> = new EventEmitter();
  public readonly defaultMaskDate = [
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.Config);
  }

  trackBy(index: number): number {
    return index;
  }

  selectRow(index: any, data: any) {
    console.log('row click: ');
    this.onRowClick.emit({ index, data });
    this.clickedRowIndex = index;
  }

  emitTableCellClick(
    $event: any,
    row: any,
    column: any,
    rowIndex: any,
    columnIndex: any
  ) {
    $event.stopPropagation();
    console.log('row', row, 'column', column);
    this.onCellClick.emit({ row, column, rowIndex, columnIndex });
  }

  getData(row: any, column: any) {
    return row[column.property];
  }

  uncheckSelectAll(selected: any) {
    if (selected == true) {
      if (
        !this.Data.find((item) => {
          return !item.selected;
        })
      ) {
        this.selectAll = true;
      }
    } else {
      this.selectAll = false;
    }
    this.onRowSelect.emit(
      this.Data.filter((item) => {
        return item.selected;
      })
    );
  }
  searchInput(searchQuery: any, index: any) {
    console.log('event: ', searchQuery);
    if (this.Config.SearchType == 'Dynamic') {
      /* Emit searching event to the page to `get sorted  data from API` */
      this.onSearchColumn.emit({
        index,
        column: this.Config.Columns[index],
        query: searchQuery,
      });
    } else {
      /* Handle Static Search */
    }
  }

  /*  onResizeEnd(event: ResizeEvent, columnIndex: any) {
    // console.log("onResizeEnd", event, columnIndex, `data_column_${this.tableId}_${columnIndex}`);
    const childWidth = event.rectangle.width;
    const rowsElements = document.getElementsByClassName(
      `data_column_${this.tableId}_${columnIndex}`
    );
    const headerElements = document.getElementsByClassName(
      `header_column_${this.tableId}_${columnIndex}`
    );
    const filterElements = document.getElementsByClassName(
      `filter_column_${this.tableId}_${columnIndex}`
    );

    // console.log("row change", rowsElements, childWidth);
    for (let i = 0; i < rowsElements.length; i++) {
      const currentEl = rowsElements[i] as HTMLDivElement;
      currentEl.style.width = childWidth + 'px';
    }
    for (let i = 0; i < headerElements.length; i++) {
      const currentEl = headerElements[i] as HTMLDivElement;
      currentEl.style.width = childWidth + 'px';
    }
    for (let i = 0; i < filterElements.length; i++) {
      const currentEl = filterElements[i] as HTMLDivElement;
      currentEl.style.width = childWidth + 'px';
    }
  } */
}
