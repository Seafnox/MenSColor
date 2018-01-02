import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GlobalServicesModule} from './services/global-services.module'
import {ComponentsModule} from './components/components.module'

@NgModule({
  imports: [
    BrowserModule,
    GlobalServicesModule,
    ComponentsModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
