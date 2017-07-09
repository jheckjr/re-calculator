import { Component, Inject } from '@angular/core';
import { AppState } from './app-state';
import { AppStore } from './app-store';
import { updatePropertyInfo,
  updatePurchaseInfo,
  updateRentalInfo } from './actions';
import { CalculateResultsService, InitDataService } from './services';

@Component({
  selector: 'app-root',
  providers: [CalculateResultsService, InitDataService],
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
    private resultsService: CalculateResultsService,
    private initDataService: InitDataService) {
    // Initialize data. Service provides empty/zeroed initial values
    let initialState = this.initDataService.initData();
    this.storeDispatch(initialState);

    store.subscribe(() => this.updateState());
    this.updateState();
  }

  private storeDispatch(newState: any) {
    this.store.dispatch(updatePropertyInfo(newState.propertyInfo));
    this.store.dispatch(updatePurchaseInfo(newState.purchaseInfo));
    this.store.dispatch(updateRentalInfo(newState.rentalInfo));
  }

  private updateState() {
    this.state = this.store.getState();
  }

  private formIsValid(): boolean {
    const isValid = this.propertyInfoValid && this.purchaseInfoValid &&
      this.rentalInfoValid;
    if (isValid) {
      this.updateResults();
    }
    
    return isValid;
  }

  private updateResults() {
    // Save state
    this.storeDispatch(this.state);

    // Calculate and display results
    this.results = this.resultsService.calcResults(this.state.purchaseInfo,
      this.state.rentalInfo);
  }
}
