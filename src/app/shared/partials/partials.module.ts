import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
})
export class PartialsModule {}
