import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "src/app/shared/shared.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PartialsModule { }
