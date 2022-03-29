import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { TableWidgetComponentsModule } from './table//table-widget-components/table-widget-components.module';
import { TableComponent } from './table/table.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [TableComponent, UserComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    TableWidgetComponentsModule,
  ],
  exports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    TableComponent,
    UserComponent,
    TableWidgetComponentsModule,
  ],
})
export class SharedModule {}
