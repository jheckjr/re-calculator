import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { createStore } from 'redux';

import { AppStore } from './app-store';
import { PropertyInfo } from './models';
import { PropertyInfoReducer } from './reducers';

import { AppComponent } from './app.component';
import { PropertyInfoComponent } from './property-info/property-info.component';
import { PurchaseInfoComponent } from './purchase-info/purchase-info.component';
import { RentalInfoComponent } from './rental-info/rental-info.component';
import { ResultsComponent } from './results/results.component';

export function storeFactory() {
  return createStore<PropertyInfo>(PropertyInfoReducer);
}

@NgModule({
  declarations: [
    AppComponent,
    PropertyInfoComponent,
    PurchaseInfoComponent,
    RentalInfoComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: AppStore, useFactory: storeFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
