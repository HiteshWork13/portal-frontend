import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONST } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  downloadDocument(id) {
    let url = `/document/downloadDocument/${id}`;
    return this.http.get(`${APP_CONST.ServerUrl}${url}`, { responseType: 'arraybuffer' })
  }

  getAllDocuments(date) {
    let url = `/document/getAllDocuments`;
    return this.http.post(`${APP_CONST.ServerUrl}${url}`, date)
  }

  uploadNewDocument(date) {
    let url = `/document/uploadDocument`;
    return this.http.post(`${APP_CONST.ServerUrl}${url}`, date)
  }

  deleteDocument(id) {
    let url = `/document/deleteDocument/${id}`;
    return this.http.delete(`${APP_CONST.ServerUrl}${url}`)
  }
}
