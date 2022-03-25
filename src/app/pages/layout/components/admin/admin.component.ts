import { Component, OnInit } from '@angular/core';
import * as adminJSON from '../../config/tables/admin-table.config.json';
import * as adminData from '../../config/tables/admin-table.data.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];
  /* Table's Configuration */
  adminTableJSON: any = JSON.parse(JSON.stringify((adminJSON as any).default));
  /* Table's Data List */
  adminList: Array<any> = [...(adminData as any).default.expenses];

  constructor() {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `London`,
      });
    }
  }
}
