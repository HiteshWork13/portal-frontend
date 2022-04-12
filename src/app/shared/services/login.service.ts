import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  superAdminLogin = config() + 'auth/adminLogin';

  constructor(private http: HttpClient) { }

  LogIn(data: any) {
    return this.http.post(this.superAdminLogin, data);
  }
}
