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
  menuItems: any;
  currentUserDetails: any;

  constructor() {}

  ngOnInit(): void {
    let current_user_details: any = localStorage.getItem(
      'current_user_details'
    );
    this.currentUserDetails = JSON.parse(current_user_details);
    this.menuItems = MENUITEMS;
    this.roleWiseSidebar();
  }

  roleWiseSidebar() {
    this.menuItems.map((element) => {
      if (
        element.id == 'admin' &&
        (this.currentUserDetails.role == 2 || this.currentUserDetails.role == 3)
      ) {
        element.enabled = false;
      } else if (element.id == 'user' && this.currentUserDetails.role == 3) {
        element.enabled = false;
      }
      return element;
    });
  }
}
