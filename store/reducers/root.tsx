import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';

import {
  Auth0State,
  BusinessEditState,
  BusinessState,
  FiltersState,
  InfoDialogState,
  RegionState,
  TourState,
  UserState,
} from '../types';
import auth0 from './auth0';
import businessEdit from './businessEdit';
import business from './business';
import filters from './filters';
import infoDialog from './infoDialog';
import region from './region';
import tour from './tour';
import user from './user';

const combinedReducer = combineReducers({
  auth0,
  businessEdit,
  business,
  filters,
  infoDialog,
  region,
  tour,
  user,
});

export type RootState = {
  auth0: Auth0State,
  businessEdit: BusinessEditState,
  business: BusinessState,
  filters: FiltersState,
  infoDialog: InfoDialogState,
  region: RegionState,
  tour: TourState,
  user: UserState,
};

// State has explicit type any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const root = (state: any, action: AnyAction): RootState => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  else {
    return combinedReducer(state, action);
  }
};

export default root;
