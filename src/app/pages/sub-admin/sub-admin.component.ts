import { Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subAdminTableConfigJSON } from '@configJson';
import { NotificationService, SubAdminService } from '@services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SUB_ADMIN_CONST } from 'src/app/shared/constants/notifications.constant';
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
})
export class SubAdminComponent implements OnInit, OnChanges {
  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('username', { static: false }) username: ElementRef;

  @Output() close: EventEmitter<any> = new EventEmitter();

  subAdminTableJSON: any = JSON.parse(JSON.stringify((subAdminTableConfigJSON as any)));

  subAdminList: Array<any>;

  isAccountsVisible: boolean = false;
  subAdminForm: FormGroup;
  matchPasswordErr: boolean = false;
  currentUserDetails: any;
  mode: string = 'add';

  selectedSubAdminId: string;

  constructor(
    private modalService: NzModalService,
    private subAdminService: SubAdminService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    let current_user_details: any = localStorage.getItem('current_user_details');
    this.currentUserDetails = JSON.parse(current_user_details);
    this.getDefaults();
    this.createForm();
    this.getSubAdminData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedAdminId.currentValue) {
      this.getSubAdminData();
    }
  }

  getDefaults() {
    this.subAdminTableJSON.Header.showClose = false;
    this.subAdminTableJSON.Header.showAdd = true;

    setTimeout(() => {
      this.subAdminTableJSON.Columns.map((column: any) => {
        if (column.property == 'actions') {
          column.actionTemplate = this.actionTemplate;
        } else if (column.property == 'status') {
          column.actionTemplate = this.statusTemplate;
        }
      });
    }, 0);
  }

  createForm() {
    this.subAdminForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      status: new FormControl(1),
      role: new FormControl(3),
      // created_by: new FormControl(this.currentUserDetails.id),
    });
  }

  getSubAdminData() {
    this.subAdminService.getAllSubAdmin({ role: 3, created_by: this.currentUserDetails.id }).then((response: any) => {
      this.subAdminList = response.data;
    }, (_error) => {
      this.notification.error(SUB_ADMIN_CONST.get_sub_admin_error);
    });
  }

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    this.mode = state;
    setTimeout(() => {
      this.username.nativeElement.focus();
    });
    if (state == 'add') {
      this.createForm();
      this.modalService.create({
        nzTitle: 'Add New Sub admin',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Save Sub admin',
            type: 'primary',

            onClick: () => this.createSubAdmin(),
          },
        ],
        nzWidth: 500,
        nzMaskClosable: false,
        nzOnCancel: () => this.onClose(),
        nzAutofocus: null,
      });
    } else {
      this.editSubadmin(item);
      this.modalService.create({
        nzTitle: 'Update Sub Admin',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Update Sub Admin',
            type: 'primary',

            onClick: () => this.updateSubadmin(item),
          },
        ],
        nzWidth: 500,
        nzMaskClosable: false,
        nzOnCancel: () => this.onClose(),
        nzAutofocus: null,
      });
    }
  }

  showDeleteConfirm(row_id: any) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this sub admin?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSubadmin(row_id),
      nzCancelText: 'No',
      nzOnCancel: () => this.onClose(),
    });
  }

  showAccounts(row: any) {
    this.selectedSubAdminId = row['id'];
    this.isAccountsVisible = true;
  }

  createSubAdmin() {
    for (const i in this.subAdminForm.controls) {
      this.subAdminForm.controls[i].markAsDirty();
      this.subAdminForm.controls[i].updateValueAndValidity();
    }
    if (this.subAdminForm.valid && !this.matchPasswordErr) {
      const formObj = this.subAdminForm.value;
      this.subAdminService.createSubAdmin(formObj).then((response) => {
        this.subAdminList = [...this.subAdminList, response['data']];
        this.modalService.closeAll();
        this.notification.success(SUB_ADMIN_CONST.create_sub_admin_success);
      }, (_error) => {
        this.notification.error(SUB_ADMIN_CONST.create_sub_admin_error);
        this.modalService.closeAll();
      });
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

  onClose() {
    this.modalService.closeAll();
  }

  editSubadmin(item) {
    this.subAdminForm.patchValue({
      username: item.username
    });
  }

  updateSubadmin(item) {
    const formObj = {
      username: this.subAdminForm.controls['username'].value
    }
    this.subAdminService.updateSubAdmin(item.id, formObj).then((response) => {
      this.subAdminList = this.subAdminList.map((element) => {
        if (element['id'] == item.id) {
          element = response['data'];
        }
        return element;
      });
      this.notification.success(SUB_ADMIN_CONST.update_sub_admin_success);
      this.modalService.closeAll();
    }, (_error) => {
      this.notification.error(SUB_ADMIN_CONST.update_sub_admin_error);
      this.modalService.closeAll();
    });
  }

  deleteSubadmin(subadmin_id) {
    this.subAdminService.deleteSubAdmin(subadmin_id).then((response) => {
      this.subAdminList = this.subAdminList.filter((element) => element['id'] !== subadmin_id);
      this.notification.success(SUB_ADMIN_CONST.delete_sub_admin_success);
    }, (_error) => {
      this.notification.error(SUB_ADMIN_CONST.delete_sub_admin_error);
    });
  }

  statusChanged(event, row_data, key) {
    row_data[key] = event == true ? 1 : 0;
    this.subAdminService.updateSubAdmin(row_data.id, row_data).then((response: any) => {
      this.subAdminList.map((element) => {
        if (element['id'] == row_data.id) {
          element = response['data'];
        }
      });
      this.notification.success(SUB_ADMIN_CONST.status_update_success);
    }, (_error) => {
      this.notification.error(SUB_ADMIN_CONST.status_update_error);
    })
  }
}