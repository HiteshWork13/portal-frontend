import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private dataService: DataService) { }

  async createAccount(formData) {
    console.log("formData", formData);
    return await this.dataService.POST("/account/createAccount", formData)
  }

  async getAllAccountsOfCurrentUser(body) {
    const currentUserId = localStorage.getItem('current_user_id');
    body['created_by'] = currentUserId;
    return await this.dataService.POST("/account/getAllAccountsByCreatedId", body)
  }
}
