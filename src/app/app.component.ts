import { Component, Inject } from '@angular/core';
import { AppState } from './app-state';
import { AppStore } from './app-store';
import { updatePropertyInfo,
  updatePurchaseInfo,
  updateRentalInfo } from './actions';
import { CalculateResultsService } from './services';

@Component({
  selector: 'app-root',
  providers: [CalculateResultsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private propertyInfoValid: boolean = false;
  private purchaseInfoValid: boolean = false;
  private rentalInfoValid: boolean = false;

  private resultsAreVisible: boolean = false;

  private state = null;
  private results = null;
  private title = 'Rental Investment Calculator';

  constructor(@Inject(AppStore) private store,
    private resultsService: CalculateResultsService) {
    // TODO: initialize data
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  private updateState() {
    this.state = this.store.getState();
    this.resultsAreVisible = false;
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
    this.results = this.resultsService.calcResults(this.state.purchaseInfo,
      this.state.rentalInfo);
    this.resultsAreVisible = true;
    event.preventDefault();
  }
}
