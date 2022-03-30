import { Injectable } from '@angular/core';
import { config } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  superAdminLogin = config() + 'auth/adminLogin';

  constructor() {}

  LogIn() {
    // console.log('superAdminLogin: ', this.superAdminLogin);
  }
}
