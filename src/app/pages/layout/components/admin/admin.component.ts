import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminService } from 'src/app/services/api/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as adminJSON from '../../config/tables/admin-table.config.json';
import * as adminData from '../../config/tables/admin-table.data.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('adminActionTemplate') adminActionTemplate: TemplateRef<any>;
  @ViewChild('adminName', { static: false }) adminName: ElementRef;
  listOfData: Array<{ name: string; age: number; address: string }> = [];
  /* Table's Configuration */
  adminTableJSON: any = JSON.parse(JSON.stringify((adminJSON as any).default));
  /* Table's Data List */
  adminList: Array<any> = [...(adminData as any).default.expenses];
  // expenseFormJSON: any = this.expenseFormConfig.formConfig;
  isUserVisible: boolean = false;
  isInstallmentVisible: boolean = false;
  adminForm: FormGroup;
  matchPasswordErr: boolean = false;
  currentUserDetails: any;

  constructor(
    private modalService: NzModalService,
    private adminService: AdminService,
    private notification: NotificationService
  ) {}
  /* Table's Configuration */

  ngOnInit(): void {
    this.getDefaults();
    this.createForm();
    this.getAdminData();
  }

  getDefaults() {
    let current_user_details: any = localStorage.getItem(
      'current_user_details'
    );
    this.currentUserDetails = JSON.parse(current_user_details);
    // this.expenseFormJSON = this.expenseFormConfig.formConfig;
    this.adminTableJSON.Header.showClose = false;
    setTimeout(() => {
      this.adminTableJSON.Columns = this.adminTableJSON.Columns.map(
        (column: any) => {
          if (column.property == 'actions') {
            column.actionTemplate =
              this.adminActionTemplate; /* Injecting Template into table */
          }
          return column;
        }
      );
    }, 0);
  }

  createForm() {
    this.adminForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      status: new FormControl(1),
      role: new FormControl(2),
      created_by: new FormControl(String(this.currentUserDetails.id)),
    });
  }

  getAdminData() {
    let data: any = {
      role: 2,
      created_by: String(this.currentUserDetails.id),
    };
    this.adminService.getAdmins(data).subscribe(
      (response: any) => {
        console.log('response: ', response.data);
        this.listOfData = response.data;
      },
      (error) => {
        console.log('error: ', error);
        this.notification.error(error.message);
      }
    );
  }

  /* Insert/Update Modal for Expense */
  openAddorUpdateExpenseModal(data: any = null, isEditMode: any = false) {
    // const Config: any = {
    //   class: 'modal-lg',
    //   initialState: {
    //     isEditMode: isEditMode,
    //     Config: this.expenseFormJSON,
    //     Data: Object.assign({}, data) ?? [],
    //   },
    // };
    // this.bsModalRef = this.modalService.openModalFromComponent(
    //   ApiFormComponent,
    //   Config
    // );
    // this.bsModalRef.content.submit.subscribe((formData: any) => {
    //   /* Submit event will execute after form submit */
    // });
  }

  showAssociates(row: any) {
    /* Fire after click on `Reminders` option from menu of action column */
    // this.isInstallmentVisible = false;
    this.isUserVisible = true;
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

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    setTimeout(() => {
      this.adminName.nativeElement.focus();
    });
    if (state == 'create') {
      this.modalService.create({
        nzTitle: 'Add New Admin',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Save Admin',
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

  fnCreateNewProduct() {
    //
  }

  editClose() {
    // this.showAddAdminModal = false;
  }

  showDeleteConfirm(row_id: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this admin?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
    // nzContent: '<b style="color: red;">Admin will be permenently deleted</b>',
  }

  onSubmit() {
    for (const i in this.adminForm.controls) {
      this.adminForm.controls[i].markAsDirty();
      this.adminForm.controls[i].updateValueAndValidity();
    }
    const formObj = this.adminForm.value;
    if (this.adminForm.valid && !this.matchPasswordErr) {
      this.adminService.createAdminapi(formObj).subscribe((response) => {
        console.log('response: ', response);
        // this.listOfData = [...this.listOfData,response.data];
        //
      });
    } else {
      //
    }
  }

  matchPassword() {
    this.matchPasswordErr = false;
    if (
      this.adminForm.controls['newPassword'].value !==
        this.adminForm.controls['newPasswordRepeat'].value &&
      this.adminForm.controls['newPasswordRepeat'].value !== ''
    ) {
      this.matchPasswordErr = true;
    }
  }
}
