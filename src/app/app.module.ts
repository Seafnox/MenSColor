import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { GlobalServicesModule } from './services/global-services.module';

@NgModule({
  imports: [
    BrowserModule,
    GlobalServicesModule,
    ComponentsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
