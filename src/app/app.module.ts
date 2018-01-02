import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GlobalServicesModule} from './services/global-services.module'

@NgModule({
  imports: [
    BrowserModule,
    GlobalServicesModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
