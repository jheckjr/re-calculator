import { Action, ActionCreator } from 'redux';
import { PropertyInfo } from '../models';

export const UPDATE_PROPERTY_INFO = 'Update Property Info';
export interface UpdatePropertyInfoAction extends Action {
  propertyInfo: PropertyInfo;
};
export const updatePropertyInfo: ActionCreator<UpdatePropertyInfoAction> =
  (propertyInfo) => ({
    type: UPDATE_PROPERTY_INFO,
    propertyInfo: propertyInfo
  });
