import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormBuilder,
  FormControl,
  Validators } from '@angular/forms';
import { PurchaseInfo } from '../models';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent implements OnInit {
  private purchaseInfoForm: FormGroup;
  private purchaseInfo: PurchaseInfo;

  constructor(private formBuilder: FormBuilder) {
    this.purchaseInfoForm = this.formBuilder.group({
      'purchasePrice': [undefined, Validators.required],
      'closingCosts': [undefined, Validators.required],
      'repairCosts': [undefined, Validators.required],
      'arv': [undefined, Validators.required],
      'downPmtPct': [undefined, Validators.required],
      'interestRate': [undefined, Validators.required],
      'loanTerm': [undefined, Validators.required]
    });

    // TODO: Remove temporary stub
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

  ngOnInit() {
  }

}
