import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PurchaseInfo } from '../models';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent implements OnChanges {
  @Input() purchaseInfo: PurchaseInfo;
  @Output() isValid = new EventEmitter();
  private purchaseInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.purchaseInfoForm = this.formBuilder.group({
      'purchasePrice': [undefined, Validators.required],
      'closingCosts': [undefined, Validators.required],
      'repairCosts': [undefined, Validators.required],
      'arv': [undefined, Validators.required],
      'downPmtPct': [undefined, Validators.required],
      'interestRate': [undefined, Validators.required],
      'loanTerm': [undefined, Validators.required]
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

  ngOnChanges() {
    if (!this.purchaseInfo) {
      this.purchaseInfo = {
        purchasePrice: 0,
        closingCosts: 0,
        repairCosts: 0,
        arv: 0,
        loanInfo: {
          downPmtPct: 0,
          interestRate: 0,
          loanTerm: 0
        }
      };
    }
  }
}
