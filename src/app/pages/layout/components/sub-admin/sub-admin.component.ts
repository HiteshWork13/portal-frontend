import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as subAdminJSON from '../../config/tables/sub_admin-table.config.json';
import * as subAdminData from '../../config/tables/sub_admin-table.data.json';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
})
export class SubAdminComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];
  @ViewChild('subAdminActionTemplate') subAdminActionTemplate: TemplateRef<any>;
  @Output() close: EventEmitter<any> = new EventEmitter();
  /* Table's Configuration */
  subAdminTableJSON: any = JSON.parse(
    JSON.stringify((subAdminJSON as any).default)
  );
  /* Table's Data List */
  userList: Array<any> = [...(subAdminData as any).default.expenses];
  isAssociatesVisible: boolean = false;
  isInstallmentVisible: boolean = false;
  @ViewChild('userName', { static: false }) userName: ElementRef;
  subAdminForm: FormGroup;
  matchPasswordErr: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // console.log('subAdminJSON: ', subAdminJSON);
    this.getTableData();
    this.subAdminTableJSON.Header.showClose = false;
    setTimeout(() => {
      this.subAdminTableJSON.Columns = this.subAdminTableJSON.Columns.map(
        (column: any) => {
          console.log('SUB ADMIN this.subAdminTableJSON: ', column);
          if (column.property == 'actions') {
            column.actionTemplate = console.log(this.subAdminActionTemplate);
            this.subAdminActionTemplate; /* Injecting Template into table */
          }
          return column;
        }
      );
    }, 0);
  }

  getTableData() {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `London`,
      });
    }
  }

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    //
  }

  showDeleteConfirm() {
    //
  }

  showAssociates(row: any) {
    //
  }

  deleteRow(row: any) {
    //
  }

  onSubmit() {
    for (const i in this.subAdminForm.controls) {
      this.subAdminForm.controls[i].markAsDirty();
      this.subAdminForm.controls[i].updateValueAndValidity();
    }
    if (this.subAdminForm.valid && !this.matchPasswordErr) {
      //
    }
  }

  matchPassword() {
    this.matchPasswordErr = false;
    if (
      this.subAdminForm.controls['newPassword'].value !==
        this.subAdminForm.controls['newPasswordRepeat'].value &&
      this.subAdminForm.controls['newPasswordRepeat'].value !== ''
    ) {
      this.matchPasswordErr = true;
    }
  }
}
