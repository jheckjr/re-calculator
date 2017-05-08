import { PropertyInfo, PurchaseInfo, RentalInfo } from './models';

export interface AppState {
  propertyInfo: PropertyInfo;
  purchaseInfo: PurchaseInfo;
  rentalInfo: RentalInfo;
}
