import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as userJSON from '../../pages/layout/config/tables/user-table.config.json';
import * as userData from '../../pages/layout/config/tables/user-table.data.json';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @ViewChild('userActionTemplate') userActionTemplate: TemplateRef<any>;
  listOfData: Array<{ name: string; age: number; address: string }> = [];
  /* Table's Configuration */
  userTableJSON: any = JSON.parse(JSON.stringify((userJSON as any).default));
  /* Table's Data List */
  userList: Array<any> = [...(userData as any).default.expenses];
  isAssociatesVisible: boolean = false;
  isInstallmentVisible: boolean = false;
  @ViewChild('userName', { static: false }) userName: ElementRef;
  userForm: FormGroup;
  matchPasswordErr: boolean = false;

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {
    this.createForm();
    this.getTableData();
    this.userTableJSON.Header.showClose = false;
    setTimeout(() => {
      this.userTableJSON.Columns = this.userTableJSON.Columns.map(
        (column: any) => {
          if (column.property == 'actions') {
            column.actionTemplate =
              this.userActionTemplate; /* Injecting Template into table */
          }
          return column;
        }
      );
    }, 0);
  }

  createForm() {
    this.userForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      companyname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      billingemail: new FormControl(null, Validators.required),
      customerid: new FormControl(null, Validators.required),
      vat: new FormControl(null, Validators.required),
      created: new FormControl(null, Validators.required),
      packageid: new FormControl(null, Validators.required),
      accounttype: new FormControl(null, Validators.required),
      credits: new FormControl(null, Validators.required),
      purchased: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      emailverified: new FormControl(null, Validators.required),
      verificationtoken: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      triallimit: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      twofactor: new FormControl(null, Validators.required),
      totaldevices: new FormControl(null, Validators.required),
      registrationtype: new FormControl(null, Validators.required),
      expirydate: new FormControl(null, Validators.required),
      analyticsstatus: new FormControl(null, Validators.required),
      packageid_dr: new FormControl(null, Validators.required),
      size_dr: new FormControl(null, Validators.required),
      totaldevices_dr: new FormControl(null, Validators.required),
      expirydate_dr: new FormControl(null, Validators.required),
      purchasedate: new FormControl(null, Validators.required),
      payasgo: new FormControl(null, Validators.required),
      payid: new FormControl(null, Validators.required),
      communicationstatus: new FormControl(null, Validators.required),
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
      this.userName.nativeElement.focus();
    });
    if (state == 'create') {
      this.modalService.create({
        nzTitle: 'Add New User',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Save User',
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

  editClose() {
    // this.showAddAdminModal = false;
  }

  showDeleteConfirm(row: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this user?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
    // nzContent: '<b style="color: red;">User will be permenently deleted</b>',
  }

  showAssociates(row: any) {
    /* Fire after click on `Reminders` option from menu of action column */
    // this.isInstallmentVisible = false;
    this.isAssociatesVisible = true;
    this.isInstallmentVisible = false;
  }

  deleteRow(row: any) {
    /* Fire after click on `Delete`  option from menu of action column */
    // const Config = {
    //   initialState: {
    //     title: 'Delete confirmation',
    //     body_message: 'Are you sure you want perform this operation ?',
    //     cancel_button_text: 'Cancel',
    //     ok_button_text: 'Yes',
    //   },
    // };
    // this.deleteConfirmRef = this.modalService.openModalFromComponent(
    //   ConfirmDialogComponent,
    //   Config
    // );
    // this.deleteConfirmRef.content.close.subscribe((isPressYes: boolean) => {
    //   /* Fire this event after confirm from dialog */
    // });
  }

  onSubmit() {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }
    if (this.userForm.valid && !this.matchPasswordErr) {
      //
    }
  }

  matchPassword() {
    this.matchPasswordErr = false;
    if (
      this.userForm.controls['newPassword'].value !==
        this.userForm.controls['newPasswordRepeat'].value &&
      this.userForm.controls['newPasswordRepeat'].value !== ''
    ) {
      this.matchPasswordErr = true;
    }
  }
}
