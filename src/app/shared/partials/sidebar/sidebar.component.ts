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
    // console.log('menuItems: ', this.menuItems);
    this.role_id = localStorage.getItem('role');
  }
}
