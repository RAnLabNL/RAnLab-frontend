import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';

import {
  Auth0State,
  InfoDialogState,
  TourState,
  UserState,
} from '../types';
import auth0 from './auth0';
import infoDialog from './infoDialog';
import tour from './tour';
import user from './user';

const combinedReducer = combineReducers({
  auth0,
  infoDialog,
  tour,
  user,
});

export type RootState = {
  auth0: Auth0State,
  infoDialog: InfoDialogState,
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
