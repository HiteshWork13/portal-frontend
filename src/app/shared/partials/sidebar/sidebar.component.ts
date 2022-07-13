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
    this.menuItems.forEach(element => {
      if (element.id = "identity_cloak") {
        if (this.packageid_dr !== 1) {
          element.title = "Document Redaction";
          element.id = "document_redaction";
        } else if ((this.packageid_dr == 1 && this.packageid == 1)) {
          element.title = "Identity Clock";
          element.id = "identity_cloak";
        } else {
          element.title = "Identity Clock";
          element.id = "identity_cloak";
        }
      }
    })
  }
}
