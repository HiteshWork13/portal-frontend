import { Component, OnInit } from '@angular/core';
import { MENUITEMS } from 'src/app/shared/constants/menu.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  role_id: any = 1;
  menuItems = MENUITEMS;

  constructor() {}

  ngOnInit(): void {
    this.role_id = Number(localStorage.getItem('role'));
    // this.roleWiseMenu();
  }

  // roleWiseMenu() {
  // this.menuItems.map((element, index) => {
  //   // console.log('element: ', element);
  //   if (this.role_id == 1 && element.id == 'admin') {
  //     element.enabled = true;
  //   }
  // });
  // }
}
