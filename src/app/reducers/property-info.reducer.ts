import { Action } from 'redux';
import { PropertyInfo } from '../models';
import { UPDATE_PROPERTY_INFO, UpdatePropertyInfoAction } from '../actions';

const initialState: PropertyInfo = null;

export const PropertyInfoReducer = function(state: PropertyInfo = initialState,
  action: Action): PropertyInfo {
    switch (action.type) {
      case UPDATE_PROPERTY_INFO: {
        return (<UpdatePropertyInfoAction>action).propertyInfo;
      }
    }
  };
