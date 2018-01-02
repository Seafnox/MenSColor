import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrainJsService} from './brain-js/brain-js.service'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BrainJsService,
  ],
})
export class GlobalServicesModule { }
