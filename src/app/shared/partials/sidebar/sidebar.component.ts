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
  packageid = 1;
  packageid_dr = 2;
  user_data: any = localStorage.getItem('current_user_details');

  constructor() { }

  ngOnInit(): void {
    let current_user_details: any = localStorage.getItem(
      'current_user_details'
    );
    this.currentUserDetails = JSON.parse(current_user_details);
    this.menuItems = MENUITEMS;
    if (this.user_data.role == 4)
      this.sideMenuForUser();
  }

  sideMenuForUser() {
    this.menuItems.forEach(element => {
      if (element.id = "clock") {
        if (this.packageid_dr !== 1) {
          element.title = "Document Redaction";
          element.id = "document_redaction";
          element.path = "history-export-dr"
        } else {
          element.title = "Identity Clock";
          element.id = "identity_cloak";
          element.path = "history-export"
        }
      }
    })
  }
}
