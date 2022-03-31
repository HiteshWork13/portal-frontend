import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
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
  @Output() onSortColumn: EventEmitter<any> = new EventEmitter();
  @Input() ExtraHeaderButtons: TemplateRef<any>;
  @Output() header_searchClick: EventEmitter<any> = new EventEmitter();
  @Output() header_addClick: EventEmitter<any> = new EventEmitter();
  @Output() header_resetClick: EventEmitter<any> = new EventEmitter();
  @Output() header_closeClick: EventEmitter<any> = new EventEmitter();
  @Output() header_downloadClick: EventEmitter<any> = new EventEmitter();
  @Output() header_uploadClick: EventEmitter<any> = new EventEmitter();
  @Output() header_deleteClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    // console.log('TABLE COMPONENT', this.Config.Columns);
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

  sortColumnChanges(index: any) {
    console.log('column index', this.Config.Columns[index]);
    if (this.Config.SortingType == 'Dynamic') {
      /* Emit sorting event to the page to `get sorted data from API` */
      this.onSortColumn.emit({ index, column: this.Config.Columns[index] });
    } else {
      /* Sort data here that is displayed in table widgets */
    }
  }

  search() {
    this.header_searchClick.emit();
  }

  add() {
    this.header_addClick.emit();
  }

  reset() {
    this.header_resetClick.emit();
  }

  close() {
    this.header_closeClick.emit();
  }

  upload() {
    this.header_uploadClick.emit();
  }

  download() {
    if (this.Config.rowSelectable == true) {
      const records = this.Data.filter((item) => {
        return item.selected;
      });
      this.header_downloadClick.emit({ Data: this.Data, Selected: records });
    } else {
      this.header_downloadClick.emit({ Data: this.Data, Selected: [] });
    }
  }

  delete() {
    this.header_deleteClick.emit();
  }

  addAdmin() {
    this.header_addClick.emit();
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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log('this.Config: ', this.Config);
  }
}
