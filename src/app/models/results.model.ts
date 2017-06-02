export interface Results {
  purchasePrice: number;
  totalCost: number;
  cashOutlay: number;
  gross: {
    revenueMonth: number,
    revenueYear: number,
    incomeMonth: number,
    incomeYear: number
  };
  expenses: {
    month: number,
    year: number
  };
  keyFactors: {
    noi: number,
    cashFlowMonth: number,
    cashFlowYear: number,
    cashROI: number,
    totalROI: number,
    capRate: number,
    grm: number,
    dscr: number
  };
  totalEquity: number;
  propertyValue: number;
};
