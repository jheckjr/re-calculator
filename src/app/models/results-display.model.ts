import { Results } from '.';

export class ResultsDisplay {
  public displayResults: any;
  
  constructor(results: Results) {
  	if (!results) {
  	  this.displayResults = {
	  	  purchasePrice: 'no data',
	  	  totalCost: 'no data',
	  	  cashOutlay: 'no data',
	  	  gross: {
	  	  	revenueMonth: 'no data',
	  	  	revenueYear: 'no data',
	  	  	incomeMonth: 'no data',
	  	  	incomeYear: 'no data'
	  	  },
	  	  expenses: {
	  	  	month: 'no data',
	  	  	year: 'no data'
	  	  },
	  	  keyFactors: {
	  	  	noi: 'no data',
	  	  	cashFlowMonth: 'no data',
	  	  	cashFlowYear: 'no data',
	  	  	cashROI: 'no data',
	  	  	totalROI: 'no data',
	  	  	capRate: 'no data',
	  	  	grm: 'no data',
	  	  	dscr: 'no data'
	  	  },
	  	  totalEquity: 'no data',
	  	  propertyValue: 'no data'
	  };
  	} else { 
	  	this.displayResults = {
	  	  purchasePrice: this.formatText(results.purchasePrice, 0, true),
	  	  totalCost: this.formatText(results.totalCost, 0, true),
	  	  cashOutlay: this.formatText(results.cashOutlay, 0, true),
	  	  gross: {
	  	  	revenueMonth: this.formatText(results.gross.revenueMonth, 0, true),
	  	  	revenueYear: this.formatText(results.gross.revenueYear, 0, true),
	  	  	incomeMonth: this.formatText(results.gross.incomeMonth, 0, true),
	  	  	incomeYear: this.formatText(results.gross.incomeYear, 0, true)
	  	  },
	  	  expenses: {
	  	  	month: this.formatText(results.expenses.month, 0, true),
	  	  	year: this.formatText(results.expenses.year, 0, true)
	  	  },
	  	  keyFactors: {
	  	  	noi: this.formatText(results.keyFactors.noi, 0, true),
	  	  	cashFlowMonth: this.formatText(results.keyFactors.cashFlowMonth, 0, true),
	  	  	cashFlowYear: this.formatText(results.keyFactors.cashFlowYear, 0, true),
	  	  	cashROI: this.formatText(results.keyFactors.cashROI, 2, false),
	  	  	totalROI: this.formatText(results.keyFactors.totalROI, 2, false),
	  	  	capRate: this.formatText(results.keyFactors.capRate, 2, false),
	  	  	grm: this.formatText(results.keyFactors.grm, 2, false),
	  	  	dscr: this.formatText(results.keyFactors.dscr, 2, false)
	  	  },
	  	  totalEquity: this.formatText(results.totalEquity, 0, true),
	  	  propertyValue: this.formatText(results.propertyValue, 0, true)
	  	};
  	}
  }
  
  private formatText(value: number, decimals: number, locale: boolean) {
  	if (!value) {
  		return 'no data';
  	}
  	const strValue = value.toFixed(decimals);
  	if (locale) {
  		return Number(strValue).toLocaleString();
  	} else {
  		return strValue;
  	}
  }
}