import { Action, ActionCreator } from 'redux';
import { RentalInfo } from '../models';

export const UPDATE_RENTAL_INFO = 'Update Rental Info';
export interface UpdateRentalInfoAction extends Action {
  rentalInfo: RentalInfo;
};
export const updateRentalInfo: ActionCreator<UpdateRentalInfoAction> =
  (rentalInfo) => ({
    type: UPDATE_RENTAL_INFO,
    rentalInfo: rentalInfo
  });
