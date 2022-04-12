import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class SubAdminService {
  body: any;
  getAllSubAdmins = config() + 'admin/getAllAdminByRoleIdAndCreatedId';
  createSubAdmin = config() + 'admin/createAdminUser';
  deleteSubAdmin = config() + 'admin/deleteAdminById';
  updateSubAdmin = config() + 'admin/updateAdminById';

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    this.body = {
      headers: headers,
      responseType: 'json',
    };
  }

  createSubAdminApi(data) {
    return this.http.post(this.createSubAdmin, data, this.body);
  }

  getSubAdminsApi(data) {
    return this.http.post(this.getAllSubAdmins, data, this.body);
  }

  updateSubAdminApi(id, data) {
    return this.http.put(this.updateSubAdmin + '/' + id, data, this.body);
  }

  deleteAdminApi(id) {
    return this.http.delete(this.deleteSubAdmin + '/' + id, this.body);
  }
}
