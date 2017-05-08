import { Reducer, combineReducers } from 'redux';
import { PropertyInfoReducer, PurchaseInfoReducer, RentalInfoReducer } from '../reducers';
import { AppState } from '../app-state';

const appReducer: Reducer<AppState> = combineReducers<AppState>({
  propertyInfo: PropertyInfoReducer,
  purchaseInfo: PurchaseInfoReducer,
  rentalInfo: RentalInfoReducer
});

export default appReducer;
