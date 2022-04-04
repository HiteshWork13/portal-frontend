import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubAdminService } from 'src/app/services/api/sub-admin.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  subadminList: Array<any> = [...(subAdminData as any).default.subadminList];
  isAssociatesVisible: boolean = false;
  usersVisible: boolean = false;
  @ViewChild('username', { static: false }) username: ElementRef;
  subAdminForm: FormGroup;
  matchPasswordErr: boolean = false;
  currentUserDetails: any;
  mode: string = 'add';

  constructor(
    private modalService: NzModalService,
    private subAdminService: SubAdminService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getDefaults();
    this.createForm();
    this.getSubAdminData();
  }

  getDefaults() {
    let current_user_details: any = localStorage.getItem(
      'current_user_details'
    );
    this.currentUserDetails = JSON.parse(current_user_details);
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
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      status: new FormControl(1),
      role: new FormControl(3),
      created_by: new FormControl(String(this.currentUserDetails.id)),
    });
  }

  getSubAdminData() {
    let data: any = {
      role: 3,
      created_by: String(this.currentUserDetails.id),
    };
    this.subAdminService.getSubAdminsApi(data).subscribe(
      (response: any) => {
        this.listOfData = response.data;
        this.subadminList = this.listOfData;
      },
      (error) => {
        this.notification.error(error.message);
      }
    );
  }

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    this.mode = state;
    setTimeout(() => {
      this.username.nativeElement.focus();
    });
    if (state == 'add') {
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

  showUsers(row: any) {
    this.usersVisible = true;
  }

  createSubAdmin() {
    for (const i in this.subAdminForm.controls) {
      this.subAdminForm.controls[i].markAsDirty();
      this.subAdminForm.controls[i].updateValueAndValidity();
    }
    if (this.subAdminForm.valid && !this.matchPasswordErr) {
      const formObj = this.subAdminForm.value;
      this.subAdminService.createSubAdminApi(formObj).subscribe(
        (response) => {
          this.listOfData = [...this.listOfData, response['data']];
          this.subadminList = this.listOfData;
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
    this.subAdminService.updateSubAdminApi(item.id, formObj).subscribe(
      (response) => {
        let updatedList: any = this.listOfData.map((element) => {
          if (element['id'] == item.id) {
            element = response['data'];
          }
          return element;
        });
        this.listOfData = updatedList;
        this.subadminList = this.listOfData;
        this.notification.success(response['message']);
        this.modalService.closeAll();
      },
      (error) => {
        this.notification.error(error['message']);
        this.modalService.closeAll();
      }
    );
  }

  deleteSubadmin(subadmin_id) {
    this.subAdminService.deleteAdminApi(subadmin_id).subscribe(
      (response) => {
        this.listOfData = this.listOfData.filter(
          (element) => element['id'] !== subadmin_id
        );
        this.subadminList = this.listOfData;
        this.notification.success(response['message']);
      },
      (error) => {
        this.notification.error(error['message']);
      }
    );
  }
}