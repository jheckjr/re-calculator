export interface RentalInfo {
  numUnits: numbe;
  rents: number[];
  otherIncome: number;
  vacancyRate: number;
  expenses: {
    electric: number,
    gas: number,
    water: number,
    sewer: number,
    trash: number,
    other: number,
    repairs: number,
    propMgmt: number,
    propTax: number,
    insurance: number
  };
  growth: {
    revenue: number,
    expenses: number,
    appreciation: number
  };
};
