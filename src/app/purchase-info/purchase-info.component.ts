import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PurchaseInfo } from '../models';
import { nonPercentValidator, percentValidator } from '../validators';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent {
  @Input() purchaseInfo: PurchaseInfo;
  @Output() isValid = new EventEmitter();
  
  private summaryInfo: any;
  private purchaseInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.purchaseInfoForm = this.formBuilder.group({
      'purchasePrice': [undefined, nonPercentValidator],
      'closingCosts': [undefined, nonPercentValidator],
      'repairCosts': [undefined, nonPercentValidator],
      'arv': [undefined, nonPercentValidator],
      'downPmtPct': [undefined, percentValidator],
      'interestRate': [undefined, percentValidator],
      'loanTerm': [undefined, nonPercentValidator]
    });
    // Subscribe to form changes to determine validity
    this.purchaseInfoForm.statusChanges.subscribe(() => {
      if (this.purchaseInfoForm.valid) {
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
    
    this.summaryInfo = {
      totalCost: '',
      downPmtAmt: '',
      loanAmt: '',
      loanPmtAmt: ''
    };
  }
  
  private update(keys) {
    // Set item to zero if input is empty by moving through layers of purchaseInfo
    // by key name
    keys.reduce((obj, key, idx, array) => {
      if (idx === array.length - 1) {
        if (!obj[key]) {
          obj[key] = 0;
        }
      } else {
        return obj[key];
      }
    }, this.purchaseInfo);
    
    this.updateTotalCost();
    this.updateLoanAmt();
    this.updateLoanPmtAmt();
  }
  
  // Total cost of cash purchase
  private updateTotalCost() {
  	const cost = (this.purchaseInfo.purchasePrice || 0) + 
  	  (this.purchaseInfo.closingCosts || 0) + (this.purchaseInfo.repairCosts || 0);
  	const strCost = cost.toFixed(0);
  	this.summaryInfo.totalCost = '$' + Number(strCost).toLocaleString();
  }
  
  // Downpayment and total loan amounts
  private updateLoanAmt() {
  	const downPmt = (this.purchaseInfo.purchasePrice * this.purchaseInfo.loanInfo.downPmtPct / 100) || 0;
  	const strDownPmt = downPmt.toFixed(0);
  	this.summaryInfo.downPmtAmt = '$' + Number(strDownPmt).toLocaleString();
  	
  	const loanAmt = (this.purchaseInfo.purchasePrice - downPmt) || 0;
  	const strLoanAmt = loanAmt.toFixed(0);
  	this.summaryInfo.loanAmt = '$' + Number(strLoanAmt).toLocaleString();
  }
  
  // Monthly loan payment
  private updateLoanPmtAmt() {
    const rate = ((this.purchaseInfo.loanInfo.interestRate || 0) / 100) / 12;	// monthly rate
    const term = (this.purchaseInfo.loanInfo.loanTerm || 0) * 12;	// term in months
    const loanAmt = (this.purchaseInfo.purchasePrice * 
  	  (100 - this.purchaseInfo.loanInfo.downPmtPct) / 100) || 0;
    
    let payment = ( (loanAmt * rate * Math.pow(1 + rate, term)) /
      (Math.pow(1 + rate, term) - 1) ) || 0;
    // Protect against infinite result due to invalid inputs
    if (!isFinite(payment)) {
    	payment = 0;
    }
    
    const strPayment = payment.toFixed(0);
    this.summaryInfo.loanPmtAmt = '$' + Number(strPayment).toLocaleString();
  }
  
  private hasError(controlName: string) {
    return this.purchaseInfoForm.controls[controlName].invalid && 
      this.purchaseInfoForm.controls[controlName].touched;
  }
}
