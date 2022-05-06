import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';

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
  @Input() btnName: any = 'Save';

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
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      companyname: new FormControl(null, [Validators.required]),
      enduser_street: new FormControl(null, [Validators.required]),
      enduser_state: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null, [Validators.required]),
      enduser_email: new FormControl(null, [Validators.required]),
      enduser_classification: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      packageid: new FormControl(null, [Validators.required]),

      // Reseller
      reseller_firstname: new FormControl(null, [Validators.required]),
      reseller_lastname: new FormControl(null, [Validators.required]),
      reseller_company: new FormControl(null, [Validators.required]),
      reseller_street: new FormControl(null, [Validators.required]),
      reseller_state: new FormControl(null, [Validators.required]),
      reseller_code: new FormControl(null, [Validators.required]),
      reseller_email: new FormControl(null, [Validators.required]),

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

      file: new FormControl(null, Validators.required),

      // packageid_dr: new FormControl(null,[Validators.required]),
      // size_dr: new FormControl(null,[Validators.required]),
      // totaldevices_dr: new FormControl(null,[Validators.required]),
      // expirydate_dr: new FormControl(null,[Validators.required]),
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
      this.formValue.emit(formObj);
    } */
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
      enduser_email: item.enduser_email,

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

  handleChange(info: { file: NzUploadFile }) {
    console.log('xxx info: ', info);
    let file = info.file!.originFileObj!
    this.userForm.patchValue({
      file: file
    })
  }

  customRequest = async (item: any, image) => {
    /* try {
      const url: any = await this.uploadFileService.upload(item, image);
      this.imageUrl = url.toString();
      this.productForm.patchValue({
        image_url: url.toString()
      });
    } catch (err) {
      this.loading = false;
    } */
  };
}
