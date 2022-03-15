import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from "./icons-provider.module";
import { NgZorroAntdModule } from "./ng-zorro-antd.module";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  exports:[
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
