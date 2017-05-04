import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { createStore } from 'redux';

import { AppStore } from './app-store';
import { PropertyInfo } from './models';
import { PropertyInfoReducer } from './reducers';

import { AppComponent } from './app.component';
import { PropertyInfoComponent } from './property-info/property-info.component';

export function storeFactory() {
  return createStore<PropertyInfo>(PropertyInfoReducer);
}

@NgModule({
  declarations: [
    AppComponent,
    PropertyInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{ provide: AppStore, useFactory: storeFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
