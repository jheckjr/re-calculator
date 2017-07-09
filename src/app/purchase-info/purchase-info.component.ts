import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PurchaseInfo } from '../models';
import { numberValidator } from '../validators';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent {
  @Input() purchaseInfo: PurchaseInfo;
  @Output() isValid = new EventEmitter();
  private purchaseInfoForm: FormGroup;
  private nonPercentValidator = [Validators.required,
    Validators.min(0),
    Validators.max(Number.MAX_SAFE_INTEGER),
    numberValidator];
  private percentValidator = [Validators.required,
    Validators.min(0),
    Validators.max(100),
    numberValidator];

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.purchaseInfoForm = this.formBuilder.group({
      'purchasePrice': [undefined, this.nonPercentValidator],
      'closingCosts': [undefined, this.nonPercentValidator],
      'repairCosts': [undefined, this.nonPercentValidator],
      'arv': [undefined, this.nonPercentValidator],
      'downPmtPct': [undefined, this.percentValidator],
      'interestRate': [undefined, this.percentValidator],
      'loanTerm': [undefined, this.nonPercentValidator]
    });
    // Subscribe to form changes to determine validity
    this.purchaseInfoForm.valueChanges.subscribe(() => {
      if (this.purchaseInfoForm.valid) {
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
  }
  
  // Total cost of cash purchase
  private totalCost() {
  	const cost = (this.purchaseInfo.purchasePrice + this.purchaseInfo.closingCosts + 
  	  this.purchaseInfo.repairCosts);
  	const strCost = cost.toFixed(0);
  	return '$' + Number(strCost).toLocaleString();
  }
  
  // Downpayment amount
  private downPmtAmt() {
  	const downPmt = (this.purchaseInfo.purchasePrice * this.purchaseInfo.loanInfo.downPmtPct / 100) || 0;
  	const strDownPmt = downPmt.toFixed(0);
  	return '$' + Number(strDownPmt).toLocaleString();
  }
  
  // Total loan amount
  private loanAmt() {
  	const loanAmt = (this.purchaseInfo.purchasePrice * 
  	  (100 - this.purchaseInfo.loanInfo.downPmtPct) / 100) || 0;
  	const strLoanAmt = loanAmt.toFixed(0);
  	return '$' + Number(strLoanAmt).toLocaleString();
  }
  
  // Monthly loan payment
  private loanPmt() {
    const rate = (this.purchaseInfo.loanInfo.interestRate / 100) / 12;	// monthly rate
    const term = this.purchaseInfo.loanInfo.loanTerm * 12;	// term in months
    const loanAmt = (this.purchaseInfo.purchasePrice * 
  	  (100 - this.purchaseInfo.loanInfo.downPmtPct) / 100);
    
    let payment = ( (loanAmt * rate * Math.pow(1 + rate, term)) /
      (Math.pow(1 + rate, term) - 1) );
    if (!isFinite(payment)) {
    	payment = 0;
    }
    
    const strPayment = payment.toFixed(0);
    return '$' + Number(strPayment).toLocaleString();
  }
}
