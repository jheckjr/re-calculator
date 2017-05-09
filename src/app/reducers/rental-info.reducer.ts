import { Action } from 'redux';
import { RentalInfo } from '../models';
import { UPDATE_RENTAL_INFO, UpdateRentalInfoAction } from '../actions';

const initialState: RentalInfo = null;

export const RentalInfoReducer = function(state: RentalInfo = initialState,
  action: Action): RentalInfo {
    switch (action.type) {
      case UPDATE_RENTAL_INFO:
        return (<UpdateRentalInfoAction>action).rentalInfo;
      default:
        return state;
    }
  };
