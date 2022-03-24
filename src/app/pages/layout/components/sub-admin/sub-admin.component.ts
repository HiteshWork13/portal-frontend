import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
})
export class SubAdminComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];

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
