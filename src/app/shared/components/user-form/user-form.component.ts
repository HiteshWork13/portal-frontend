import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as countries from 'country-list';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';
import { APP_CONST } from '../../constants/app.constant';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() state: string = 'add';
  @Input() item: any;
  @Input() btnName: any = 'Save';
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  accountForm: FormGroup;
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
  currentUserDetails: any;
  countryList: Array<string> = countries.getNames();
  superAdminRole: any = APP_CONST.Role.SuperAdmin;

  constructor(private modalService: NzModalService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    let current_user_details: any = localStorage.getItem('current_user_details');
    this.currentUserDetails = JSON.parse(current_user_details);
    // this.currentUserDetails.role == 1;
    this.createForm();
    if (this.state == 'edit') {
      this.editAccount(this.item);
    }
  }

  createForm() {
    const email = `${Date.now()}@facitdatasystems.com`;
    this.accountForm = new FormGroup({
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

      file: new FormControl(null, (this.currentUserDetails.role !== this.superAdminRole ? Validators.required : null)),

      // packageid_dr: new FormControl(null,[Validators.required]),
      // size_dr: new FormControl(null,[Validators.required]),
      // totaldevices_dr: new FormControl(null,[Validators.required]),
      // expirydate_dr: new FormControl(null,[Validators.required]),
    });
  }

  handleCredit(e) {
    const selectedPack = this.packageList.find((pack) => pack.id == e);
    if (selectedPack) {
      this.accountForm.controls.credits.setValue(selectedPack['credit']);
    }
  }

  onSubmit() {
  }

  editAccount(item) {
    this.accountForm.patchValue({
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

  handleChange(event) {
    let rules = {
      accept: ['application/pdf'],
      size: APP_CONST.MaxFileSizeInMB
    }

    const files = event.target.files;
    this.validateSizeBeforeUpload(files[0], rules).subscribe(isValid => {
      if (isValid) {
        this.accountForm.patchValue({
          file: files[0]
        })
      }
    })
  }

  validateSizeBeforeUpload = (file, rules) => {
    return new Observable((observer: Observer<boolean>) => {
      if (file) {
        let isAcceptable = false, isValidSize = false;
        if (rules.accept) {
          isAcceptable = rules.accept.indexOf(file.type) != -1 ? true : false
        }
        if (rules.size) {
          isValidSize = file.size / 1024 / 1024 < rules.size ? true : false
        }
        if (!isAcceptable) {
          this.notification.create('error', 'File Type Error', `File ${file.name} is not valid for upload.`, { nzDuration: 6000, nzPauseOnHover: true });
        }
        if (!isValidSize) {
          this.notification.create('error', 'File Size Error', `File ${file.name} is larger then ${APP_CONST.MaxFileSizeInMB}MB.`, { nzDuration: 6000, nzPauseOnHover: true });
        }
        observer.next(isAcceptable && isValidSize);
        observer.complete();
      }
    });
  };

  openFileBrowser(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).click();
    }
  }
}
