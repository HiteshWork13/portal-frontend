import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  getAllAdmins = config() + 'admin/getAllAdminByRoleIdAndCreatedId';
  createAdmin = config() + 'admin/createAdminUser';

  constructor(private http: HttpClient) {}

  getAdmins(data: any) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    let body: any = {
      headers: headers,
      responseType: 'json',
    };
    return this.http.post(this.getAllAdmins, data, body);
  }

  createAdminapi(data: any) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    let body: any = {
      headers: headers,
      responseType: 'json',
    };
    return this.http.post(this.createAdmin, data, body);
  }
}
