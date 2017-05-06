export interface PurchaseInfo {
  purchasePrice: number;
  closingCosts: number;
  repairCosts: number;
  arv: number;
  loanInfo: {
    downPmtPct: number,
    interestRate: number,
    loanTerm: number
  };
};
