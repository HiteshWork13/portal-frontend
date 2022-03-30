import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/api/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  admin_creds: any = [
    { username: 'super_admin@gmail.com', password: 'super_admin@123', role: 1 },
    { username: 'admin@gmail.com', password: 'admin@123', role: 2 },
    { username: 'sub_admin@gmail.com', password: 'sub_admin@123', role: 3 },
  ];
  btn_loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginservice: LoginService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.fnLogin(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  /* getRole(value: any) {
    let userData: any = this.admin_creds.find(
      (element: any) =>
        element.username == value.username && element.password == value.password
    );
    return userData.role;
  } */

  fnLogin(data: any) {
    this.btn_loader = true;
    this.loginservice.LogIn(data).subscribe(
      (response: any) => {
        this.btn_loader = false;
        this.router.navigate(['/dashboard']);
        console.log('response: ', response);
        let login_response: any = response.data;
        let current_user_details: any = {
          id: login_response.id,
          username: login_response.username,
          email: login_response.email,
          role: login_response.role,
        };
        localStorage.setItem('current_user_details', current_user_details);
        localStorage.setItem('access_token', login_response.access_token);
      },
      (error) => {
        this.btn_loader = false;
        this.notification.error(error.message);
      }
    );
  }
}
