import { Action } from 'redux';
import { PurchaseInfo } from '../models';
import { UPDATE_PURCHASE_INFO, UpdatePurchaseInfoAction } from '../actions';

const initialState: PurchaseInfo = {
  purchasePrice: 0,
  closingCosts: 0,
  repairCosts: 0,
  arv: 0,
  loanInfo: {
    downPmtPct: 0,
    interestRate: 0,
    loanTerm: 0
  }
};

export const PurchaseInfoReducer = function(state: PurchaseInfo = initialState,
  action: Action): PurchaseInfo {
    switch (action.type) {
      case UPDATE_PURCHASE_INFO: {
        return (<UpdatePurchaseInfoAction>action).purchaseInfo;
      }
    }
  };
