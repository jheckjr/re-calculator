import { Action } from 'redux';
import { PropertyInfo } from '../models';
import { UPDATE_PROPERTY_INFO, UpdatePropertyInfoAction } from '../actions';

const initialState: PropertyInfo = {
  reportName: '',
  address: {
    street: '',
    city: '',
    state: null,
    zip: ''
  },
  salesDescription: '',
  mlsNumber: '',
  userNotes: '',
  imageName: ''
};

export const PropertyInfoReducer = function(state: PropertyInfo = initialState,
  action: Action): PropertyInfo {
    switch (action.type) {
      case UPDATE_PROPERTY_INFO: {
        return (<UpdatePropertyInfoAction>action).propertyInfo;
      }
    }
  };
