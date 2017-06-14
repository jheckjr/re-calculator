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
    // Hard-coded expected values come from spreadsheet calculations in Google Drive
    // (https://docs.google.com/spreadsheets/d/10Lo4wimc7OpqE6idMAVhkbXMv9NXJm4qZk_Hsw-_WKg/edit#gid=1818283363)
    // TODO: check every item in the results object - need to compare to spreadsheet
    expect(results.purchasePrice).toEqual(purchaseInfoMock.purchasePrice);
    expect(results.totalCost).toEqual(purchaseInfoMock.purchasePrice +
      purchaseInfoMock.closingCosts + purchaseInfoMock.repairCosts);
    expect(results.cashOutlay).toEqual(42500);
    expect(results.gross.revenueMonth).toEqual(1400);
    expect(results.gross.revenueYear).toEqual(16800);
    expect(results.gross.incomeMonth).toEqual(1296);
    expect(results.gross.incomeYear).toEqual(15552);
    expect(results.expenses.month).toEqual(504);
    expect(results.expenses.year).toEqual(6050);
    expect(results.keyFactors.noi).toEqual(9502);
    expect(results.keyFactors.cashFlowMonth).toEqual(333);
    expect(results.keyFactors.cashFlowYear).toEqual(4002);
    // TODO: Will likely need to make these ranges
    expect(results.keyFactors.cashROI).toEqual(9.42);
    expect(results.keyFactors.totalROI).toEqual(16.65);
    expect(results.keyFactors.capRate).toEqual(7.92);
    expect(results.keyFactors.grm).toEqual(8.24);
    expect(results.keyFactors.dscr).toEqual(1.73);
    expect(results.propertyValue).toEqual(150000);
    expect(results.totalEquity).toEqual(55691);
  }));
});
