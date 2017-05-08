export interface Results {
  purchasePrice: number;
  totalCost: number;
  cashOutlay: number;
  grossIncome: {
    revenueMonth: number,
    revenueAnnual: number,
    incomeMonth: number,
    incomeAnnual: number
  };
  expenses: {
    month: number,
    annual: number
  };
  keyFactors: {
    noi: number,
    cashFlowMonth: number,
    cashFlowAnnual: number,
    cashROI: number,
    totalROI: number,
    capRate: number,
    grm: number,
    dscr: number
  };
  totalEquity: number;
  propertyValue: number;
};
