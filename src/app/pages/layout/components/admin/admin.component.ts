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
  adminTableJSON: any = JSON.parse(JSON.stringify((adminJSON as any).default));
  adminList: Array<any> = [...(adminData as any).default.admins];
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
    this.adminService.getAdminsApi(data).subscribe(
      (response: any) => {
        this.listOfData = response.data;
        this.adminList = this.listOfData;
      },
      (error) => {
        this.notification.error(error.message);
      }
    );
  }

  showAssociates(row: any) {
    this.isUserVisible = true;
    this.isInstallmentVisible = false;
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

            onClick: () => this.createAdmin(),
          },
        ],
        nzWidth: 500,
        nzMaskClosable: false,
        nzOnCancel: () => this.onClose(),
        nzAutofocus: null,
      });
    } else {
      this.editAdmin(item);
      this.modalService.create({
        nzTitle: 'Update Admin',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Update Admin',
            type: 'primary',

            onClick: () => this.updateAdmin(item),
          },
        ],
        nzWidth: 500,
        nzMaskClosable: false,
        nzOnCancel: () => this.onClose(),
        nzAutofocus: null,
      });
    }
  }

  editAdmin(item) {
    this.adminForm.patchValue({
      username: item.username,
      email: item.email,
      status: item.status,
    });
  }

  onClose() {
    this.modalService.closeAll();
  }

  showDeleteConfirm(row_id: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this admin?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAdmin(row_id),
      nzCancelText: 'No',
      nzOnCancel: () => this.onClose(),
    });
    // nzContent: '<b style="color: red;">Admin will be permenently deleted</b>',
  }

  deleteAdmin(admin_id) {
    this.adminService.deleteAdminApi(admin_id).subscribe(
      (response) => {
        console.log('delete admin api response: ', response);
        this.notification.success(response['message']);
      },
      (error) => {
        console.log('delete admin api error: ', error);
        this.notification.error(error['message']);
      }
    );
  }

  createAdmin() {
    for (const i in this.adminForm.controls) {
      this.adminForm.controls[i].markAsDirty();
      this.adminForm.controls[i].updateValueAndValidity();
    }
    if (this.adminForm.valid && !this.matchPasswordErr) {
      const formObj = this.adminForm.value;
      this.adminService.createAdminapi(formObj).subscribe(
        (response) => {
          this.listOfData = [...this.listOfData, response['data']];
          this.adminList = this.listOfData;
          this.modalService.closeAll();
          this.notification.success(response['message']);
        },
        (error) => {
          this.notification.error(error['message']);
          this.modalService.closeAll();
        }
      );
    }
  }

  updateAdmin(item) {
    for (const i in this.adminForm.controls) {
      this.adminForm.controls[i].markAsDirty();
      this.adminForm.controls[i].updateValueAndValidity();
    }
    if (this.adminForm.valid && !this.matchPasswordErr) {
      const formObj = this.adminForm.value;
      this.adminService.updateAdminApi(item.id, formObj).subscribe(
        (response) => {
          this.listOfData = [...this.listOfData, response['data'].raw];
          this.adminList = this.listOfData;
          this.notification.success(response['message']);
          this.modalService.closeAll();
        },
        (error) => {
          this.notification.error(error['message']);
          this.modalService.closeAll();
        }
      );
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
