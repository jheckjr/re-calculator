import { Action } from 'redux';
import { RentalInfo } from '../models';
import { UPDATE_RENTAL_INFO, UpdateRentalInfoAction } from '../actions';

const initialState: RentalInfo = {
  numUnits: 0,
  rents: [0, 0, 0, 0],
  otherIncome: 0,
  vacancyRate: 0,
  expenses: {
    electric: 0,
    gas: 0,
    water: 0,
    sewer: 0,
    trash: 0,
    other: 0,
    repairs: 0,
    propMgmt: 0,
    propTax: 0,
    insurance: 0
  },
  growth: {
    revenue: 0,
    expenses: 0,
    appreciation: 0
  }
};

export const RentalInfoReducer = function(state: RentalInfo = initialState,
  action: Action): RentalInfo {
    switch (action.type) {
      case UPDATE_RENTAL_INFO: {
        return (<UpdateRentalInfoAction>action).rentalInfo;
      }
    }
  };
