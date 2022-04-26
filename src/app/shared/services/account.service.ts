import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private dataService: DataService) { }

  async createAccount(formData) {
    return await this.dataService.POST("/account/createAccount", formData)
  }

  async getAllAccountsOfCurrentUser(body) {
    const currentUserId = localStorage.getItem('current_user_id');
    body['created_by_id'] = currentUserId;
    // return await this.dataService.POST("/account/getAllAccountsByCreatedId", body)
    return await this.dataService.POST("/account/getAccountsByAdminAndSubAdmin", body)
  }

  async getAllAccountsByAdminAndSubAdmin(body) {
    return await this.dataService.POST("/account/getAccountsByAdminAndSubAdmin", body)
  }

  async updateAccount(id, formData) {
    return await this.dataService.PUT(`/account/updateAccount/${id}`, formData)
  }

  async deleteAccount(id) {
    return await this.dataService.DELETE(`/account/deleteAccount/${id}`)
  }
}
