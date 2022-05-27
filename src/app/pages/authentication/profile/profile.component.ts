import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, NotificationService } from '@services';
import { ADMIN_CONST } from 'src/app/shared/constants/notifications.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pwdForm: FormGroup;
  matchPasswordErr: boolean = false;
  saveChanges: boolean = false;
  currentUserId = localStorage.getItem('current_user_id');

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.pwdForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]]
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      })
  }

  onSubmit() {
    // 
  }

  matchPassword() {
    this.matchPasswordErr = false;
    this.saveChanges = true;
    if (
      this.pwdForm.controls['password'].value !==
      this.pwdForm.controls['confirmPassword'].value &&
      this.pwdForm.controls['confirmPassword'].value !== ''
    ) {
      this.matchPasswordErr = true;
      this.saveChanges = false;
    }
  }

  savePassword() {
    let id = this.currentUserId;
    let data: any = {
      password: this.pwdForm.controls['password'].value
    }
    this.adminService.updateAdmin(id, data).then((result) => {
      this.notification.success(ADMIN_CONST.update_admin_success);
    }, (error) => {
      this.notification.error(ADMIN_CONST.update_admin_error);
    })
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}