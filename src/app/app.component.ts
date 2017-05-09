import { Component, Inject } from '@angular/core';
import { AppState } from './app-state';
import { AppStore } from './app-store';
import { updatePropertyInfo,
  updatePurchaseInfo,
  updateRentalInfo } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private propertyInfoValid: boolean = false;
  private purchaseInfoValid: boolean = false;
  private rentalInfoValid: boolean = false;

  private state = null;
  private title = 'Rental Investment Calculator';

  constructor(@Inject(AppStore) private store) {
    // TODO: initialize data
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  private updateState() {
    this.state = this.store.getState();
  }

  private isFormValid(): boolean {
    return (this.propertyInfoValid && this.purchaseInfoValid &&
      this.rentalInfoValid);
  }

  private submitInfo(event: any) {
    // Save state
    this.store.dispatch(updatePropertyInfo(this.state.propertyInfo));
    this.store.dispatch(updatePurchaseInfo(this.state.purchaseInfo));
    this.store.dispatch(updateRentalInfo(this.state.rentalInfo));

    // TODO: Calculate and display results
    event.preventDefault();
  }
}
