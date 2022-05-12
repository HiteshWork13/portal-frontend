import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONST } from '../constants/app.constant';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private dataService: DataService, private http: HttpClient) { }

  async createAccount(formData) {
    return await this.dataService.POST("/account/createAccount", formData)
  }

  async getAllAccountsOfCurrentUser(body) {
    // return await this.dataService.POST("/account/getAllAccountsByCreatedId", body)
    return await this.dataService.POST("/account/getAccountsByAdminAndSubAdmin", body)
  }

  async getAllAccountsByAdminAndSubAdmin(body) {
    return await this.dataService.POST("/account/getAccountsByAdminAndSubAdmin", body)
  }

  async updateAccount(id, formData) {
    return await this.dataService.PUT(`/account/updateAccount/${id}`, formData)
  }

  async updateAccountStatus(id, data) {
    return await this.dataService.PUT(`/account/updateAccountStatus/${id}`, data)
  }

  async deleteAccount(id) {
    return await this.dataService.DELETE(`/account/deleteAccount/${id}`)
  }

  downloadDocument(id) {
    let url = `/document/downloadDocument/${id}`
    return this.http.get(`${APP_CONST.ServerUrl}${url}`, { responseType: 'arraybuffer' })
  }
}
