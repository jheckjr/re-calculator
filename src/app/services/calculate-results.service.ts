import { Injectable } from '@angular/core';
import { PurchaseInfo, RentalInfo, Results } from '../models';

@Injectable()
export class CalculateResultsService {
  private MONTHS_IN_YEAR = 12;
  private INITIAL_YEAR = 1;

  constructor() { }

  /*
   * Make the calculations to produce the investment results from the purchase
   * and rental information. Return the results in a Results object.
   */
  calcResults(purchaseInfo: PurchaseInfo, rentalInfo: RentalInfo): Results {
    let results: Results;
    results.purchasePrice = purchaseInfo.purchasePrice;
    results.totalCost = purchaseInfo.purchasePrice + purchaseInfo.closingCosts +
      purchaseInfo.repairCosts;

    // Downpayment amount for use in other calculations
    let downPmtAmt =
      purchaseInfo.purchasePrice * (purchaseInfo.loanInfo.downPmtPct / 100);
    results.cashOutlay = this.cashOutlay(downPmtAmt, purchaseInfo.closingCosts,
      purchaseInfo.repairCosts);

    // Monthly gross revenue
    let grossRev = this.grossRevenue(rentalInfo.rents);
    results.gross.revenueMonth = grossRev + rentalInfo.otherIncome;
    results.gross.revenueYear = grossRev * this.MONTHS_IN_YEAR;

    // Monthly gross income
    let grossInc = this.grossIncome(grossRev, rentalInfo.vacancyRate);
    results.gross.incomeMonth = grossInc + rentalInfo.otherIncome;
    results.gross.incomeYear = grossInc * this.MONTHS_IN_YEAR;

    // Annual expenses
    let expenses = this.totalExpenses(rentalInfo.expenses, results.gross.incomeYear);
    results.expenses.year = expenses;
    results.expenses.month = expenses / this.MONTHS_IN_YEAR;

    // Annual Net Operating Income
    results.keyFactors.noi = this.noi(results.gross.incomeYear, results.expenses.year);

    // Total loan amount, monthly loan payment, and annual cash flow
    let loanAmt = this.loanAmount(purchaseInfo.purchasePrice, downPmtAmt);
    let loanPmt = this.loanPayment(loanAmt, purchaseInfo.loanInfo.interestRate,
      purchaseInfo.loanInfo.loanTerm);
    let cashFlow = this.cashFlow(results.keyFactors.noi, loanPmt);
    results.keyFactors.cashFlowYear = cashFlow;
    results.keyFactors.cashFlowMonth = cashFlow / this.MONTHS_IN_YEAR;

    results.keyFactors.cashROI = this.cashROI(cashFlow, results.cashOutlay);

    // Loan amortization schedule, total equity per year, appreciation per year
    let amortSchedule = this.makeAmortSchedule(loanAmt,
      purchaseInfo.loanInfo.interestRate, purchaseInfo.loanInfo.loanTerm);
    let equity = this.equity(amortSchedule, this.INITIAL_YEAR);
    let appreciation = purchaseInfo.arv + this.appreciation(purchaseInfo.arv,
      rentalInfo.growth.appreciation, this.INITIAL_YEAR);
    results.keyFactors.totalROI = this.totalROI(equity, appreciation, cashFlow,
      results.cashOutlay);
    results.keyFactors.capRate = this.capRate(purchaseInfo.purchasePrice,
      results.keyFactors.noi);
    results.keyFactors.grm = this.grossRentMult(purchaseInfo.purchasePrice,
      results.gross.revenueYear);
    results.keyFactors.dscr = this.debtSCRatio(results.keyFactors.noi, loanPmt)

    results.propertyValue = purchaseInfo.arv + this.appreciation(purchaseInfo.arv,
      rentalInfo.growth.appreciation, this.INITIAL_YEAR, true);
    results.totalEquity = results.propertyValue - amortSchedule[1];
    return results;
  }

  /*
   * Mortgage amount
   * Input: purchase price
   *		  downpayment amount
   * Output: amount in mortgage in dollars
   */
  private loanAmount(purchasePrice: number, downpayment: number): number {
    if (!purchasePrice || !downpayment)
      return 0;

    if (purchasePrice <= 0 || downpayment <= 0)
      return 0;

    return purchasePrice - downpayment;
  }

  /*
   * Mortgage payment (fixed rate)
   * Input: loan amount
   *		  interest rate (percentage)
   *		  term in years
   * Output: annual mortgage payment
   */
  private loanPayment(loanAmount: number, intRate: number, loanTerm: number): number {
    if (!loanAmount || !intRate || !loanTerm)
      return 0;

    if (loanAmount <= 0 || intRate <= 0 || loanTerm <= 0)
      return 0;

    let rate = (intRate / 100) / 12;	// monthly rate
    let term = loanTerm * 12;	// term in months
    let payment = (loanAmount * rate * Math.pow(1 + rate, term)) /
      (Math.pow(1 + rate, term) - 1);

    return payment * 12;
  }

  /*
   * Cash outlay
   * Input: downpayment
   * 		  closing costs
   *      repair cost
   * Output: cash outlay amount
   */
  private cashOutlay(downpayment: number, closingCost: number, repairCost: number): number {
    if (!downpayment || !closingCost || !repairCost)
      return 0;

    if (downpayment < 0 || closingCost < 0 || repairCost < 0)
      return 0;

    return downpayment + closingCost + repairCost;
  }

  /*
   * Gross Revenue
   * Input: monthly rent amounts
   * Output: monthly gross revenue
   */
  private grossRevenue(rent: number[]): number {
    if (!rent)
      return 0;

    if (rent.length === 0)
    	return 0;

    return rent.reduce(function(prev, curr) {
    	return prev += curr;
    });
  }

  /*
   * Gross income
   * Input: gross revenue
   *		  vacancy rate (percentage)
   * Output: gross income
   */
  private grossIncome(grossRev: number, vacancyRate: number): number {
    if (!grossRev || !vacancyRate)
      return 0;

    if (vacancyRate < 0 || 100 < vacancyRate)
      return 0;

    return grossRev * (1 - (vacancyRate / 100));
  }

  /*
   * Total expenses
   * Input: list of annual expenses
   *      gross annual income
   * Output: sum of expenses
   */
  private totalExpenses(expenses: any, grossInc: number): number {
    if (!expenses || !grossInc)
      return 0;

    let totalExp = expenses.electric + expenses.gas + expenses.water +
      expenses.sewer + expenses.trash + expenses.other + expenses.propTax +
      expenses.insurance;
    totalExp += (expenses.repairs + expenses.propMgmt) * grossInc;

    return totalExp;
  }

  /*
   * NOI
   * Input: gross income
   * 		  total expenses
   * Output: NOI
   */
  private noi(grossIncome: number, totalExpenses: number): number {
    if (!grossIncome || !totalExpenses)
      return 0;

    return grossIncome - totalExpenses;
  }

  /*
   * Cash flow
   * Input: noi
   *		  mortgage payment
   * Output: cash flow amount
   */
  private cashFlow(noi: number, loanPayment: number): number {
    if (!noi || !loanPayment)
      return 0;

    return noi - loanPayment;
  }

  /*
   * Cash ROI
   * Input: annual cash flow
   *		  cash outlay
   * Output: cash ROI percentage
   */
  private cashROI(cashFlow: number, cashOutlay: number): number {
    if (!cashOutlay || !cashFlow)
      return 0;

    if (cashOutlay === 0)
    		return 0;

    return (cashFlow / cashOutlay) * 100;
  }

  /*
   * Total ROI
   * Input: equity accrued
   *   	  appreciation
   *		  annual cash flow
   *		  cash outlay
   * Output: total ROI percentage
   */
  private totalROI(equity: number, appreciation: number, cashFlow: number, cashOutlay: number): number {
    if (!equity || !appreciation || !cashFlow || !cashOutlay)
      return 0;

    if (cashOutlay === 0)
    		return 0;

    return ((equity + appreciation + cashFlow) / cashOutlay) * 100;
  }

  /*
   * Cap rate
   * Input: NOI
   *		  purchase cost
   * Output: cap rate (percentage)
   */
  private capRate(purchasePrice: number, noi: number): number {
    if (!purchasePrice || !noi)
      return 0;

    if (purchasePrice <= 0)
    		return 0;

    return (noi / purchasePrice) * 100;
  }

  /*
   * Gross rent multiplier
   * Input: purchase price
   *		  gross revenue per year
   * Output: gross rent multiplier
   */
  private grossRentMult(purchasePrice: number, grossRev: number): number {
    if (!purchasePrice || !grossRev)
      return 0;

    if (purchasePrice <= 0 || grossRev <= 0)
    		return 0;

    return purchasePrice / grossRev;
  }

  /*
   * Debt service coverage ratio (DSCR)
   * Input: annual NOI
   *		  monthly mortgage payment
   * Output: DSCR
   */
  private debtSCRatio(noi: number, loanPayment: number): number {
    if (!noi || !loanPayment)
      return 0;

    if (loanPayment === 0)
    		return 0;

    return noi / loanPayment;
  }

  /*
   * Equity accrued
   * Input: year
   * Output: equity accrued in that year
   * remainingLoanVal is array of yearly remaining loan amounts
   */
  private equity(remainingLoanVal: number[], year: number, total: boolean = false): number {
    if (!remainingLoanVal || !year)
      return 0;

    if (remainingLoanVal.length === 0)
    		return 0;
    if (year === 0)
    		return remainingLoanVal[year];

    if (!total)
    		return remainingLoanVal[year - 1] - remainingLoanVal[year];
    else
    		return remainingLoanVal.reduce(function(prev, curr, index, arr) {
        if (index <= year)
          return prev + (arr[index] - arr[index - 1]);
        else
          return prev;
    		});
  }

  /*
   * Appreciation
   * Input: after repair value
   *		  appreciation rate
          year
   * Output: appreciation amount
   */
  private appreciation(arv: number, appRate: number, year: number, total: boolean = false): number {
    if (!arv || !appRate || !year)
      return 0;

    if (year === 0)
    		return arv;

    let totalApp = 0;
    let annualApp = 0;
    let rate = appRate / 100;

    for (let i = 1; i <= year; i++) {
    		annualApp = rate * (arv + totalApp);
    		totalApp += annualApp;
    }

    if (!total)
    		return annualApp;
    else
    		return totalApp;
  }

  /*
   * Create amortization schedule
   * Input: loan amount
   * 		  interest rate
   *		  loan term (years)
   * Output: array of yearly remaining loan amounts
   */
  private makeAmortSchedule(loanAmount: number, intRate: number, loanTerm: number): number[] {
    if (!loanAmount || !intRate || !loanTerm)
      return [0];

    if (loanAmount <= 0 || intRate <= 0 || loanTerm <= 0)
    		return [0];

    let schedule = [loanAmount];
    let monthlyRate = (intRate / 100) / 12;
    let monthlyRem = loanAmount;
    let payment = this.loanPayment(loanAmount, intRate, loanTerm);

    for (let i = 1; i <= loanTerm * 12; i++) {
    		let principal = payment - (monthlyRem * monthlyRate);
    		monthlyRem -= principal;

    		if (i % 12 === 0)
        schedule.push(monthlyRem);
    }

    // Remove rounding error
    schedule[loanTerm] = 0;

    return schedule;
  }
}
