import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  usersVisible: boolean = false;
  @ViewChild('subAdminName', { static: false }) subAdminName: ElementRef;
  subAdminForm: FormGroup;
  matchPasswordErr: boolean = false;

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {
    this.createForm();
    this.getTableData();
    this.subAdminTableJSON.Header.showClose = false;
    setTimeout(() => {
      this.subAdminTableJSON.Columns = this.subAdminTableJSON.Columns.map(
        (column: any) => {
          if (column.property == 'actions') {
            column.actionTemplate =
              this.subAdminActionTemplate; /* Injecting Template into table */
          }
          return column;
        }
      );
    }, 0);
  }

  createForm() {
    this.subAdminForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, Validators.required),
    });
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
    setTimeout(() => {
      this.subAdminName.nativeElement.focus();
    });
    if (state == 'create') {
      this.modalService.create({
        nzTitle: 'Add New Sub admin',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Save Sub admin',
            type: 'primary',

            onClick: () => this.onSubmit(),
          },
        ],
        nzWidth: 500,
        nzMaskClosable: false,
        nzOnCancel: () => this.editClose(),
        nzAutofocus: null,
      });
    }
  }

  showDeleteConfirm(row: any) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this sub admin?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
    // nzContent: '<b style="color: red;">Sub admin will be permenently deleted</b>',
  }

  showUsers(row: any) {
    this.usersVisible = true;
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

  editClose() {
    // this.showAddAdminModal = false;
  }
}
