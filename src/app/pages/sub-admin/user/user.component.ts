import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { superAdminUserTableConfigJson, userTableConfigJSON } from '@configJson';
import { AccountService, NotificationService } from '@services';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
import { UserDetailsComponent } from 'src/app/shared/user-details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;
  @ViewChild('created_by_template') created_by_template: TemplateRef<any>;

  @Input() selectedAdminId: string = null;

  @Output() close: EventEmitter<any> = new EventEmitter();

  accountTableJSON: any = JSON.parse(JSON.stringify((userTableConfigJSON as any)));
  accountList: Array<any>;
  modalRef: any;
  packageList: Array<any> = [
    {
      id: 1,
      label: "Pack 1",
      credit: 10000
    },
    {
      id: 2,
      label: "Pack 2",
      credit: 20000
    },
    {
      id: 3,
      label: "Pack 3",
      credit: 30000
    }
  ]

  isAssociatesVisible: boolean = false;
  isInstallmentVisible: boolean = false;
  userForm: FormGroup;
  matchPasswordErr: boolean = false;
  currentUserDetails: any;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;


  constructor(private modalService: NzModalService, private accountService: AccountService, private notification: NotificationService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    let current_user_details: any = localStorage.getItem('current_user_details');
    this.currentUserDetails = JSON.parse(current_user_details);
    this.accountTableJSON = this.currentUserDetails.role == 1 ? JSON.parse(JSON.stringify(superAdminUserTableConfigJson as any)) : JSON.parse(JSON.stringify(userTableConfigJSON as any));
    this.getDefaults();
    this.createForm();
    this.getAccountData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedAdminId.currentValue) {
      this.getAccountData();
    }
  }

  createForm() {
    const email = `${Date.now()}@facitdatasystems.com`;
    this.userForm = new FormGroup({
      code: new FormControl(null),
      // End User
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      companyname: new FormControl(null),
      enduser_street: new FormControl(null),
      enduser_state: new FormControl(null),
      postcode: new FormControl(null),
      enduser_email: new FormControl(email),
      enduser_classification: new FormControl(null),
      country: new FormControl(null),
      packageid: new FormControl(null),

      // Reseller
      reseller_firstname: new FormControl(null),
      reseller_lastname: new FormControl(null),
      reseller_company: new FormControl(null),
      reseller_street: new FormControl(null),
      reseller_state: new FormControl(null),
      reseller_code: new FormControl(null),
      reseller_email: new FormControl(email),

      // Hard Core Values
      triallimit: new FormControl(7),
      password: new FormControl(`${Date.now()}${Math.random()}`),
      totaldevices: new FormControl(1),
      twofactor: new FormControl(false),
      expirydate: new FormControl(moment().add(7, 'd').format('YYYY-MM-DD')),
      payasgo: new FormControl(false),
      payid: new FormControl(1),
      billingemail: new FormControl(email),
      credits: new FormControl(60000),
      accounttype: new FormControl(1),
      email: new FormControl(email),
      purchased: new FormControl(true),
      role: new FormControl(4),
      registrationtype: new FormControl(0),
      analyticsstatus: new FormControl(true),
      communicationstatus: new FormControl(true),
      phone: new FormControl(null),
      customerid: new FormControl(null),
      address: new FormControl(null),
      vat: new FormControl(null),
      city: new FormControl(null),
      verificationtoken: new FormControl(null),

      // packageid_dr: new FormControl(null),
      // size_dr: new FormControl(null),
      // totaldevices_dr: new FormControl(null),
      // expirydate_dr: new FormControl(null),
    });
  }

  handleCredit(e) {
    const selectedPack = this.packageList.find(pack => pack.id == e)
    if (selectedPack) {
      this.userForm.controls.credits.setValue(selectedPack['credit'])
    }
  }

  async getAccountData() {
    this.accountService.getAllAccountsByAdminAndSubAdmin({ created_by_id: this.selectedAdminId }).then((account: any) => {
      if (account.success) {
        this.accountList = account.data;
      }
    }, error => {
      this.notification.error(error.message);
    });
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
        let formValue = event.userForm.value;
        let valid: boolean = event.userForm.valid;
        if (valid == true) {
          state == 'add' ? this.onSubmit(formValue) : this.updateUser(item.id, formValue);
          return true;
        } else {
          for (const i in event.userForm.controls) {
            event.userForm.controls[i].markAsDirty();
            event.userForm.controls[i].updateValueAndValidity();
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
      (response) => {
        this.accountList = this.accountList.filter((element) => element['id'] !== id);
        this.notification.success(response['message']);
      }, (error) => {
        this.notification.error(error['message']);
      });
  }

  onSubmit(event = this.userForm.value) {
    const input = new FormData()
    input.append("file", event['file']);
    input.append("data", JSON.stringify(event))
    this.accountService.createAccount(input).then(
      (result: any) => {
        if (result.success) {
          this.accountList.push(result.data);
        }
        this.notification.success(result['message']);
      },
      (error) => {
        this.notification.error(error['message']);
      }
    );
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
        this.notification.success(response['message']);
      }, (error) => {
        this.notification.error(error['message']);
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
    row_data[key] = event;
    this.updateUser(row_data.id, row_data)
  }
}
