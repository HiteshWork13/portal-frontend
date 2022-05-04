import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
// import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WidgetModule } from './widgets/widget.module';

@NgModule({
  declarations: [UserFormComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    WidgetModule,
  ],
  exports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    WidgetModule,
    UserFormComponent,
    UserDetailsComponent
  ],
})
export class SharedModule { }
