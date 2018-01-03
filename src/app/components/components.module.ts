import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatPrefix } from '@angular/material';
import { RgbHashFormComponent } from './rgb-hash-form/rgb-hash-form.component';
import { RgbSeparatedFormComponent } from './rgb-separated-form/rgb-separated-form.component';

const DECLARATION_LIST = [
  RgbHashFormComponent,
  RgbSeparatedFormComponent,
];

const MATERIAL_COMPONENT_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_COMPONENT_MODULES,
  ],
  declarations: [
    ...DECLARATION_LIST,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...DECLARATION_LIST,
    ...MATERIAL_COMPONENT_MODULES,
  ],
})
export class ComponentsModule { }
