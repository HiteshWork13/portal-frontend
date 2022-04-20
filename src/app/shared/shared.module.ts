import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
// import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { WidgetModule } from './widgets/widget.module';

@NgModule({
  declarations: [UserFormComponent],
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
    UserFormComponent
  ],
})
export class SharedModule { }
