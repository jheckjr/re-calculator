import { State } from './state.enum';

export interface PropertyInfo {
  reportName: string;
  address: {
    street: string,
    city: string,
    state: State,
    zip: string
  };
  salesDescription: string;
  mlsNumber: string;
  userNotes: string;
  imageName: any;
};
