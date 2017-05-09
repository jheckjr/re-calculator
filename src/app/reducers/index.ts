import { Reducer, combineReducers } from 'redux';
import { PropertyInfoReducer } from './property-info.reducer';
import { PurchaseInfoReducer } from './purchase-info.reducer';
import { RentalInfoReducer } from './rental-info.reducer';
import { AppState } from '../app-state';

const appReducer: Reducer<AppState> = combineReducers<AppState>({
  propertyInfo: PropertyInfoReducer,
  purchaseInfo: PurchaseInfoReducer,
  rentalInfo: RentalInfoReducer
});

export default appReducer;
