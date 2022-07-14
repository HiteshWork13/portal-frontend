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
  user_data: any = JSON.parse(localStorage.getItem('current_user_details'));
  packageid = this.user_data.packageid;
  packageid_dr = this.user_data.packageid_dr;

  constructor() { }

  ngOnInit(): void {
    this.menuItems = JSON.parse(JSON.stringify(MENUITEMS));
    if (this.user_data.isUserLogin) this.sideMenuForUser();
  }

  sideMenuForUser() {
    if (this.packageid == 1 && this.packageid_dr == 1) {
      this.filterMenu('identity_cloak');
    } else if (this.packageid == 1 && this.packageid_dr !== 1) {
      this.filterMenu('document_redaction');
    } else if (this.packageid !== 1 && this.packageid_dr == 1) {
      this.filterMenu('identity_cloak');
    }
  }

  filterMenu(key) {
    this.menuItems = this.menuItems.filter((element) => {
      return element.id == key;
    })
  }
}
