import { TestBed, inject } from '@angular/core/testing';

import { CalculateResultsService } from './calculate-results.service';
import { PurchaseInfo, RentalInfo, Results } from '../models';

describe('CalculateResultsService', () => {
  let purchaseInfoMock: PurchaseInfo;
  let rentalInfoMock: RentalInfo;
  let results: Results;

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

  it('should calculate the purchase costs', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();

    // method under test
    results = service.calcResults(purchaseInfoMock, rentalInfoMock);

    // verify
    // Hard-coded expected values come from spreadsheet calculations in Google Drive
    // (https://docs.google.com/spreadsheets/d/10Lo4wimc7OpqE6idMAVhkbXMv9NXJm4qZk_Hsw-_WKg/edit#gid=1818283363)
    expect(results.purchasePrice).toEqual(purchaseInfoMock.purchasePrice);
    expect(results.totalCost).toEqual(purchaseInfoMock.purchasePrice +
      purchaseInfoMock.closingCosts + purchaseInfoMock.repairCosts);
    expect(results.cashOutlay).toEqual(42500);
  }));

  it('should calculate the gross revenue/income', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();

    // method under test
    results = service.calcResults(purchaseInfoMock, rentalInfoMock);

    // verify
    // Hard-coded expected values come from spreadsheet calculations in Google Drive
    // (https://docs.google.com/spreadsheets/d/10Lo4wimc7OpqE6idMAVhkbXMv9NXJm4qZk_Hsw-_WKg/edit#gid=1818283363)
    expect(results.gross.revenueMonth).toEqual(1400);
    expect(results.gross.revenueYear).toEqual(16800);
    expect(results.gross.incomeMonth).toEqual(1296);
    expect(results.gross.incomeYear).toEqual(15552);
  }));

  it('should calculate the expenses', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();

    // method under test
    results = service.calcResults(purchaseInfoMock, rentalInfoMock);

    // verify
    // Hard-coded expected values come from spreadsheet calculations in Google Drive
    // (https://docs.google.com/spreadsheets/d/10Lo4wimc7OpqE6idMAVhkbXMv9NXJm4qZk_Hsw-_WKg/edit#gid=1818283363)
    expect(results.expenses.month).toBeCloseTo(524, 0);
    expect(results.expenses.year).toBeCloseTo(6290, 0);
  }));

  it('should calculate the key factors', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();

    // method under test
    results = service.calcResults(purchaseInfoMock, rentalInfoMock);

    // verify
    // Hard-coded expected values come from spreadsheet calculations in Google Drive
    // (https://docs.google.com/spreadsheets/d/10Lo4wimc7OpqE6idMAVhkbXMv9NXJm4qZk_Hsw-_WKg/edit#gid=1818283363)
    expect(results.keyFactors.noi).toBeCloseTo(9262, 0);
    expect(results.keyFactors.cashFlowMonth).toBeCloseTo(313, 0);
    expect(results.keyFactors.cashFlowYear).toBeCloseTo(3762, 0);
    expect(results.keyFactors.cashROI).toBeCloseTo(8.85, 1);
    expect(results.keyFactors.totalROI).toBeCloseTo(16.09, 1);
    expect(results.keyFactors.capRate).toBeCloseTo(7.72, 1);
    expect(results.keyFactors.grm).toBeCloseTo(8.24, 1);
    expect(results.keyFactors.dscr).toBeCloseTo(1.68, 1);
  }));

  it('should calculate the value and equity', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();

    // method under test
    results = service.calcResults(purchaseInfoMock, rentalInfoMock);

    // verify
    // Hard-coded expected values come from spreadsheet calculations in Google Drive
    // (https://docs.google.com/spreadsheets/d/10Lo4wimc7OpqE6idMAVhkbXMv9NXJm4qZk_Hsw-_WKg/edit#gid=1818283363)
    expect(results.propertyValue).toEqual(150000);
    expect(results.totalEquity).toBeCloseTo(55691, 0);
  }));
});
