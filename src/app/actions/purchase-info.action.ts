import { Action, ActionCreator } from 'redux';
import { PurchaseInfo } from '../models';

export const UPDATE_PURCHASE_INFO = 'Update Purchase Info';
export interface UpdatePurchaseInfoAction extends Action {
  purchaseInfo: PurchaseInfo;
};
export const updatePurchaseInfo: ActionCreator<UpdatePurchaseInfoAction> =
  (purchaseInfo) => ({
    type: UPDATE_PURCHASE_INFO,
    purchaseInfo: purchaseInfo
  });
