import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminTableConfigJSON } from "@configJson";
import { AdminService, NotificationService } from '@services';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('adminName', { static: false }) adminName: ElementRef;
  adminTableJSON: any = JSON.parse(JSON.stringify((adminTableConfigJSON as any)));

  // listOfData: Array<{ name: string; age: number; address: string }> = [];
  adminList: Array<any>;
  isSubAdminVisible: boolean = false;
  isAccountsVisible: boolean = false;
  adminForm: FormGroup;
  matchPasswordErr: boolean = false;
  currentUserDetails: any;
  mode: string = 'add';

  // When click on particular admin
  selectedAdminIdForSubAdmin: string = null;
  selectedAdminIdForAccounts: string = null;

  constructor(
    private modalService: NzModalService,
    private adminService: AdminService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getDefaults();
    this.createForm();
    this.getAdminData();
  }

  getDefaults() {
    let current_user_details: any = localStorage.getItem('current_user_details');
    this.currentUserDetails = JSON.parse(current_user_details);
    setTimeout(() => {
      this.adminTableJSON.Columns.map((column: any) => {
        if (column.property == 'actions') {
          column.actionTemplate = this.actionTemplate;
        } else if (column.property == 'status') {
          column.actionTemplate = this.statusTemplate
        }
      });
    }, 0);
  }

  createForm() {
    this.adminForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      status: new FormControl(1),
      role: new FormControl(2),
      // created_by: new FormControl(String(this.currentUserDetails.id)),
    });
  }

  getAdminData() {
    this.adminService.getAllAdmin({ role: 2, created_by_id: this.currentUserDetails.id }).then((response: any) => {
      this.adminList = response.data;
    }, (error) => {
      this.notification.error(error.message);
    });
  }

  handleAdminRowClick({ data, index }) {
    this.handleSubAdmin(data);
    this.handleAccounts(data);
  }

  handleSubAdmin(data) {
    this.selectedAdminIdForSubAdmin = data.id;
    this.isSubAdminVisible = true;
  }

  handleAccounts(data) {
    this.selectedAdminIdForAccounts = data.id;
    this.isAccountsVisible = true;
  }

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    this.mode = state;
    setTimeout(() => {
      this.adminName.nativeElement.focus();
    });
    if (state == 'add') {
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
      username: item.username
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
    this.adminService.deleteAdmin(admin_id).then(
      (response) => {
        this.adminList = this.adminList.filter((element) => element['id'] !== admin_id);
        this.notification.success(response['message']);
      }, (error) => {
        this.notification.error(error['message']);
      });
  }

  createAdmin() {
    for (const i in this.adminForm.controls) {
      this.adminForm.controls[i].markAsDirty();
      this.adminForm.controls[i].updateValueAndValidity();
    }
    if (this.adminForm.valid && !this.matchPasswordErr) {
      const formObj = this.adminForm.value;
      this.adminService.createAdmin(formObj).then(
        (response) => {
          this.adminList = [...this.adminList, response['data']];
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
    const formObj = {
      username: this.adminForm.controls['username'].value
    }
    this.adminService.updateAdmin(item.id, formObj).then((response) => {
      this.adminList = this.adminList.map((element) => {
        if (element['id'] == item.id) {
          element = response['data'];
        }
        return element;
      });
      this.notification.success(response['message']);
      this.modalService.closeAll();
    }, (error) => {
      this.notification.error(error['message']);
      this.modalService.closeAll();
    });
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