import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  body: any;
  getAllAdmins = config() + 'admin/getAllAdminByRoleIdAndCreatedId';
  createAdmin = config() + 'admin/createAdminUser';
  deleteAdmin = config() + 'admin/deleteAdminById';
  updateAdmin = config() + 'admin/updateAdminById';

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    /* params?: new HttpParams | {
        [param: string]: string | string[];
    }; */
    this.body = {
      headers: headers,
      responseType: 'json',
    };
  }

  getAdminsApi(data: any) {
    return this.http.post(this.getAllAdmins, data, this.body);
  }

  createAdminapi(data: any) {
    return this.http.post(this.createAdmin, data, this.body);
  }

  deleteAdminApi(data) {
    console.log('this.body: ', this.body);
    return this.http.delete(this.deleteAdmin + '/' + data, this.body);
  }

  updateAdminApi(id, data) {
    return this.http.put(this.updateAdmin + '/' + id, data, this.body);
  }
}
