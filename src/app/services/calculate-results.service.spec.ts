import { TestBed, inject } from '@angular/core/testing';

import { CalculateResultsService } from './calculate-results.service';
import { PurchaseInfo, RentalInfo, Results } from '../models';

describe('CalculateResultsService', () => {
  let purchaseInfoMock: PurchaseInfo;
  let rentalInfoMock: RentalInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculateResultsService]
    });

    purchaseInfoMock = {
      purchasePrice: 120000,
      closingCosts: 3500,
      repairCosts: 15000,
      arv: 150000,
      loanInfo: {
        downPmtPct: 20,
        interestRate: 4,
        loanTerm: 30
      }
    };

    rentalInfoMock = {
      numUnits: 2,
      rents: [600, 700],
      otherIncome: 100,
      vacancyRate: 8,
      expenses: {
        electric: 240,
        gas: 200,
        water: 400,
        sewer: 100,
        trash: 150,
        other: 85,
        repairs: 10,
        propMgmt: 10,
        propTax: 1000,
        insurance: 1000
      },
      growth: {
        revenue: 1,
        expenses: 1,
        appreciation: 1
      }
    };
  });

  it('should calculate a Results object', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();

    // method under test
    let results = service.calcResults(purchaseInfoMock, rentalInfoMock);

    // verify
    // TODO: check every item in the results object - need to compare to spreadsheet
  }));
});
