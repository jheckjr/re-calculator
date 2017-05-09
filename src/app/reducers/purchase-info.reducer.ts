import { Action } from 'redux';
import { PurchaseInfo } from '../models';
import { UPDATE_PURCHASE_INFO, UpdatePurchaseInfoAction } from '../actions';

const initialState: PurchaseInfo = null;

export const PurchaseInfoReducer = function(state: PurchaseInfo = initialState,
  action: Action): PurchaseInfo {
    switch (action.type) {
      case UPDATE_PURCHASE_INFO:
        return (<UpdatePurchaseInfoAction>action).purchaseInfo;
      default:
        return state;
    }
  };
