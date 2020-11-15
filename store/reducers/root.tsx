import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';

import {
  Auth0State,
  UserState,
} from '../types';
import auth0 from './auth0';
import user from './user';

const combinedReducer = combineReducers({
  auth0,
  user,
});

export type RootState = {
  auth0: Auth0State,
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