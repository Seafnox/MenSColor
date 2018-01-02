import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RgbHashFormComponent } from './rgb-hash-form/rgb-hash-form.component';
import { RgbSeparatedFormComponent } from './rgb-separated-form/rgb-separated-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RgbHashFormComponent, RgbSeparatedFormComponent]
})
export class ComponentsModule { }
