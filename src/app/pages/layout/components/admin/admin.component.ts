import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
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
