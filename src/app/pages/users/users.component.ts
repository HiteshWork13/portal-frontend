import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { userTableConfigJSON } from '@configJson';
import { AccountService, NotificationService } from '@services';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;
  @ViewChild('created_by_template') created_by_template: TemplateRef<any>;

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
  userformref: UserFormComponent;

  constructor(private modalService: NzModalService, private accountService: AccountService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.getDefaults();
    this.createForm();
    this.getAccountData();
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
    this.accountService.getAllAccountsOfCurrentUser({}).then((account: any) => {
      if (account.success) {
        this.accountList = account.data;
      }
    }, error => {
      this.notification.error(error.message);
    });
  }

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    if (state == 'add') {
      this.createForm();
      this.modalRef = this.modalService.create({
        nzTitle: 'Add New Account',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Save',
            type: 'primary',
            onClick: () => this.onSubmit(),
          },
        ],
        nzWidth: '80%',
        nzMaskClosable: false,
        nzOnCancel: () => this.editClose(),
        nzAutofocus: null,
      });
    } else {
      this.editUser(item);
      this.modalRef = this.modalService.create({
        nzTitle: 'Edit Account',
        nzContent: temp,
        nzFooter: [
          {
            label: 'Update',
            type: 'primary',
            onClick: () => this.updateUser(),
          },
        ],
        nzWidth: '80%',
        nzMaskClosable: false,
        nzOnCancel: () => this.editClose(),
        nzAutofocus: null,
      });
    }
  }

  editUser(item) {
    this.userForm.patchValue({
      code: item.code,
      // End User
      firstname: item.firstname,
      lastname: item.lastname,
      companyname: item.companyname,
      enduser_street: item.enduser_street,
      enduser_state: item.enduser_state,
      postcode: item.postcode,
      enduser_classification: item.enduser_classification,
      country: item.country,
      packageid: item.packageid,

      // Reseller
      reseller_firstname: item.reseller_firstname,
      reseller_lastname: item.reseller_lastname,
      reseller_company: item.reseller_company,
      reseller_street: item.reseller_street,
      reseller_state: item.reseller_state,
      reseller_code: item.reseller_code,
      reseller_email: item.reseller_email,

      // Hard Core Values
      triallimit: item.triallimit,
      totaldevices: item.totaldevices,
      twofactor: item.twofactor,
      expirydate: item.expirydate,
      payasgo: item.payasgo,
      payid: item.payid,
      billingemail: item.billingemail,
      credits: item.credits,
      accounttype: item.accounttype,
      email: item.email,
      purchased: item.purchased,
      role: item.role,
      registrationtype: item.registrationtype,
      analyticsstatus: item.analyticsstatus,
      communicationstatus: item.communicationstatus,
      phone: item.phone,
      customerid: item.customerid,
      address: item.address,
      vat: item.vat,
      city: item.city,
      verificationtoken: item.verificationtoken,
    })
  }

  editClose() {
    // this.userForm.markAsPristine();
    // this.userForm.markAsUntouched();
  }

  updateUser() {
    // 
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

  onSubmit() {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }
    if (this.userForm.valid && !this.matchPasswordErr) {
      // const currentUser = JSON.parse(localStorage.getItem("current_user_details"));
      // this.userForm.value['created_by_id'] = currentUser.id;
      this.userForm.value['packageid_dr'] = this.userForm.value['packageid'];
      this.userForm.value['totaldevices_dr'] = this.userForm.value['totaldevices'];
      this.userForm.value['expirydate_dr'] = this.userForm.value['expirydate'];
      this.userForm.value['size_dr'] = 0;
      this.accountService.createAccount(this.userForm.value).then((result: any) => {
        if (result.success) {
          this.accountList.push(result.data)
        }
        this.modalRef.destroy();
        this.notification.success(result['message']);
      }, (error) => {
        this.notification.error(error['message']);
      })
    } else {
      this.notification.error('Invalid Form');
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

  getDefaults() {
    this.accountTableJSON.Header.showClose = false;
    setTimeout(() => {
      this.accountTableJSON.Columns = this.accountTableJSON.Columns.map(
        (column: any) => {
          if (column.property == 'actions') {
            column.actionTemplate = this.actionTemplate;
          } else if (column.property == 'created_by') {
            column.actionTemplate = this.created_by_template;
          }
          return column;
        }
      );
    }, 0);
  }
}
