import { Injectable } from '@angular/core';
import { PropertyInfo, PurchaseInfo, RentalInfo } from '../models';

@Injectable()
export class InitDataService {
  private propertyInfo: PropertyInfo;
  private purchaseInfo: PurchaseInfo;
  private rentalInfo: RentalInfo;

  constructor() {
    this.propertyInfo = {
      reportName: '',
      address: {
        street: '',
        city: '',
        state: undefined,
        zip: ''
      },
      salesDescription: '',
      mlsNumber: '',
      userNotes: '',
      imageName: ''
    };

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

    this.rentalInfo = {
      numUnits: 1,
      rents: [0],
      otherIncome: 0,
      vacancyRate: 0,
      expenses: {
        electric: 0,
        gas: 0,
        water: 0,
        sewer: 0,
        trash: 0,
        other: 0,
        repairs: 0,
        propMgmt: 0,
        propTax: 0,
        insurance: 0
      },
      growth: {
        revenue: 0,
        expenses: 0,
        appreciation: 0
      }
    };
  }

  initData() {
    return {
      propertyInfo: this.propertyInfo,
      purchaseInfo: this.purchaseInfo,
      rentalInfo: this.rentalInfo
    };
  }
}
