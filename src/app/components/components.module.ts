import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RgbHashFormComponent } from './rgb-hash-form/rgb-hash-form.component';
import { RgbSeparatedFormComponent } from './rgb-separated-form/rgb-separated-form.component';

const DECLARATION_LIST = [
  RgbHashFormComponent,
  RgbSeparatedFormComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...DECLARATION_LIST,
  ],
  exports: [
    ...DECLARATION_LIST,
  ],
})
export class ComponentsModule { }
