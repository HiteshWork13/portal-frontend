import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { superAdminUserTableConfigJson, userTableConfigJSON } from '@configJson';
import { APP_CONST } from '@constants';
import { AccountService, NotificationService } from '@services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
import { ACCOUNT_CONST } from 'src/app/shared/constants/notifications.constant';
import { UserDetailsComponent } from 'src/app/shared/user-details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;
  @ViewChild('created_by_template') created_by_template: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @Input() selectedAdminId: string = null;
  @Output() close: EventEmitter<any> = new EventEmitter();
  accountList: Array<any>;
  modalRef: any;
  accountTableJSON: any = JSON.parse(JSON.stringify((userTableConfigJSON as any)));
  currentUserDetails: any;
  superAdminRole: any = APP_CONST.Role.SuperAdmin;
  pag_params: any = { pageIndex: 1, pageSize: 5 };
  loading: boolean = true;
  totalData: number = 10;
  PageSize: number = 5;


  constructor(private modalService: NzModalService, private accountService: AccountService, private notification: NotificationService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    let current_user_details: any = localStorage.getItem('current_user_details');
    this.currentUserDetails = JSON.parse(current_user_details);
    this.accountTableJSON = this.currentUserDetails.role == this.superAdminRole ? JSON.parse(JSON.stringify(superAdminUserTableConfigJson as any)) : JSON.parse(JSON.stringify(userTableConfigJSON as any));
    this.getDefaults();
    this.getAccountData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedAdminId.currentValue) {
      this.getAccountData();
    }
  }

  async getAccountData(paginationParams = this.pag_params) {
    let offset = (paginationParams.pageIndex - 1) * paginationParams.pageSize;
    let api_body = {
      offset: offset,
      limit: paginationParams.pageSize,
      created_by_id: this.selectedAdminId,
      order: { "username": "ASC" },
    }
    this.accountService.getAllAccountsOfCurrentUser(api_body).then((account: any) => {
      if (account.success) {
        this.accountList = account.data;
        this.loading = false;
        this.totalData = account.counts;
        this.PageSize = account.limit;
      }
    },
      (_error) => {
        this.loading = false;
      }
    );
  }

  openModal(state: any, item: any) {
    this.modalService.create({
      nzTitle: state == 'add' ? 'Add New' : 'Update' + ' Account',
      nzContent: UserFormComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '80%',
      nzComponentParams: {
        item: item,
        state: state
      },
      nzOnOk: (event) => {
        let formValue = event.accountForm.value;
        let valid: boolean = event.accountForm.valid;
        if (valid == true) {
          state == 'add' ? this.onSubmit(formValue) : this.updateUser(item.id, formValue);
          return true;
        } else {
          for (const i in event.accountForm.controls) {
            event.accountForm.controls[i].markAsDirty();
            event.accountForm.controls[i].updateValueAndValidity();
          }
          return false
        }
      },
      nzMaskClosable: false,
      nzAutofocus: null,
      nzOnCancel: () => this.onClose(),
    });
  }

  onClose() {
    this.modalService.closeAll();
  }

  showDeleteConfirm(row_id: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this account?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAccount(row_id),
      nzCancelText: 'No',
      nzOnCancel: () => this.onClose(),
    });
  }

  deleteAccount(id) {
    this.accountService.deleteAccount(id).then(
      (response: any) => {
        if (response.success) {
          this.accountList = this.accountList.filter((element) => element['id'] !== id);
          this.notification.success(ACCOUNT_CONST.delete_account_success);
        }
      }, (_error) => {
        this.notification.error(ACCOUNT_CONST.delete_account_error);
      });
  }

  onSubmit(event) {
    const input = new FormData()
    if (event['file'] !== null) input.append("file", event['file']);
    input.append("data", JSON.stringify(event))
    this.accountService.createAccount(input).then(
      (result: any) => {
        if (result.success) {
          this.accountList.push(result.data);
          this.notification.success(ACCOUNT_CONST.create_account_success);
        }
      },
      (_error) => {
        this.notification.error(ACCOUNT_CONST.create_account_error);
      }
    );
  }

  getDefaults() {
    this.accountTableJSON.Header.showClose = true;
    this.accountTableJSON.Header.showAdd = false;
    setTimeout(() => {
      this.accountTableJSON.Columns = this.accountTableJSON.Columns.map(
        (column: any) => {
          if (column.property == 'actions') {
            column.actionTemplate = this.actionTemplate;
          } else if (column.property == 'created_by') {
            column.actionTemplate = this.created_by_template;
          } else if (column.property == 'emailverified') {
            column.actionTemplate = this.statusTemplate
          }
          return column;
        }
      );
    }, 0);
  }

  updateUser(id, event) {
    const input = new FormData();
    if (event['file'] !== null) input.append("file", event['file']);
    delete event['file'];
    input.append("data", JSON.stringify(input));
    this.accountService.updateAccount(id, event).then(
      (response: any) => {
        this.accountList = this.accountList.map((element) => {
          if (element['id'] == id) {
            element = response['data'];
          }
          return element;
        });
        this.notification.success(ACCOUNT_CONST.update_account_success);
      }, (_error) => {
        this.notification.error(ACCOUNT_CONST.update_account_error);
      })
  }

  accountDetailsModel(row) {
    this.modalService.create({
      nzTitle: 'Account Details',
      nzContent: UserDetailsComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        row_data: row
      },
      nzWidth: '50%',
      nzMaskClosable: false,
      nzAutofocus: null,
      nzFooter: [
        {
          label: 'Close',
          type: 'default',
          onClick: () => this.onClose(),
        },
      ],
      nzOnCancel: () => this.onClose(),
    });
  }

  statusChanged(event, row_data, key) {
    const body = {
      [key]: event
    }
    this.accountService.updateAccountStatus(row_data.id, body).then((response: any) => {
      this.accountList.map((element) => {
        if (element['id'] == row_data.id) {
          element = response['data'];
        }
      });
      this.notification.success(ACCOUNT_CONST.status_update_success);
    }, (_error) => {
      this.notification.error(ACCOUNT_CONST.status_update_error);
    })
  }
}