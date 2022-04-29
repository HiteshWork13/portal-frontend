import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() item: any;
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  @Input() state: string = 'add';
  userForm: FormGroup;
  packageList: Array<any> = [
    {
      id: 1,
      label: 'Pack 1',
      credit: 10000,
    },
    {
      id: 2,
      label: 'Pack 2',
      credit: 20000,
    },
    {
      id: 3,
      label: 'Pack 3',
      credit: 30000,
    },
  ];

  constructor(private modalService: NzModalService) { }

  ngOnInit(): void {
    this.createForm();
    if (this.state == 'edit') {
      this.editAccount(this.item);
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
    const selectedPack = this.packageList.find((pack) => pack.id == e);
    if (selectedPack) {
      this.userForm.controls.credits.setValue(selectedPack['credit']);
    }
  }

  onSubmit() {
    /* for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }
    if (this.userForm.valid) {
      const formObj = this.userForm.value();
      console.log('formObj: ', formObj);
      this.formValue.emit(formObj);
    } */
  }

  editClose() {
    // destroy modal / close modal
  }

  editAccount(item) {
    this.userForm.patchValue({
      id: item.id,
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
    });
  }

  handleChange(event) {
    // 
  }
}
