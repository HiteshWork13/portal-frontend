import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  admin_creds: any = [
    { userName: 'super_admin@gmail.com', password: 'super_admin@123', role: 1 },
    { userName: 'admin@gmail.com', password: 'admin@123', role: 2 },
    { userName: 'sub_admin@gmail.com', password: 'sub_admin@123', role: 3 },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      let role = this.getRole(this.validateForm.value);
      localStorage.setItem('role', role);
      this.router.navigate(['/dashboard']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getRole(value: any) {
    let userData: any = this.admin_creds.find(
      (element: any) =>
        element.userName == value.userName && element.password == value.password
    );
    return userData.role;
  }
}
