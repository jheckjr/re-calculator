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
      purchasePrice: undefined,
      closingCosts: undefined,
      repairCosts: undefined,
      arv: undefined,
      loanInfo: {
        downPmtPct: undefined,
        interestRate: undefined,
        loanTerm: undefined
      }
    };

    this.rentalInfo = {
      numUnits: 1,
      rents: [undefined],
      otherIncome: undefined,
      vacancyRate: undefined,
      expenses: {
        electric: undefined,
        gas: undefined,
        water: undefined,
        sewer: undefined,
        trash: undefined,
        other: undefined,
        repairs: undefined,
        propMgmt: undefined,
        propTax: undefined,
        insurance: undefined
      },
      growth: {
        revenue: undefined,
        expenses: undefined,
        appreciation: undefined
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
