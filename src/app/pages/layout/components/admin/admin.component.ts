import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as adminJSON from '../../config/tables/admin-table.config.json';
import * as adminData from '../../config/tables/admin-table.data.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];
  /* Table's Configuration */
  adminTableJSON: any = JSON.parse(JSON.stringify((adminJSON as any).default));
  /* Table's Data List */
  adminList: Array<any> = [...(adminData as any).default.expenses];
  // expenseFormJSON: any = this.expenseFormConfig.formConfig;
  @ViewChild('adminActionTemplate') adminActionTemplate: TemplateRef<any>;
  isAssociatesVisible: boolean = false;
  isInstallmentVisible: boolean = false;
  @ViewChild('adminName', { static: false }) adminName: ElementRef;
  adminForm: FormGroup;
  matchPasswordErr: boolean = false;

  constructor(private modalService: NzModalService) {}
  /* Table's Configuration */

  ngOnInit(): void {
    this.createForm();
    this.getTableData();
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

  showDeleteConfirm(): void {
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
    if (this.adminForm.valid && !this.matchPasswordErr) {
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
