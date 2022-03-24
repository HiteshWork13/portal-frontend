import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';

@NgModule({
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    IconsProviderModule,
  ],
})
export class SharedModule {}
