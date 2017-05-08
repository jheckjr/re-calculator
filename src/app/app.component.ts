import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private propertyInfoValid: boolean = false;
  private purchaseInfoValid: boolean = false;
  private rentalInfoValid: boolean = false;

  propertyInfo = null;
  purchaseInfo = null;
  rentalInfo = null;
  title = 'Rental Investment Calculator';

  ngOnInit() {
    // TODO: set data
  }

  private isFormValid(): boolean {
    return (this.propertyInfoValid && this.purchaseInfoValid &&
      this.rentalInfoValid);
  }

  private submitInfo() {

  }
}
