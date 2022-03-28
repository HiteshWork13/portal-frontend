import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnInit {
  @Input() Columns: any;
  @Input() Header: any;
  @Input() ExtraButtons: TemplateRef<any>;
  @Input() ExtraButtonContext: any = {};

  @Output() searchClick: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() resetClick: EventEmitter<any> = new EventEmitter();
  @Output() closeClick: EventEmitter<any> = new EventEmitter();
  @Output() downloadClick: EventEmitter<any> = new EventEmitter();
  @Output() uploadClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggleColumn(i: any) {
    // event.stopPropagation();
    this.Columns[i].visible = !this.Columns[i].visible;
    // this.changeDetectorRef.markForCheck();
  }

  search() {
    this.searchClick.emit();
  }

  add() {
    this.addClick.emit();
  }

  reset() {
    this.resetClick.emit();
  }

  close() {
    this.closeClick.emit();
  }

  download() {
    this.downloadClick.emit();
  }

  upload() {
    this.uploadClick.emit();
  }
}
