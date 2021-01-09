import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import { RootState } from '../reducers/root';

export const ADD_BUSINESS_BY_REGION_ID_STARTED = 'ADD_BUSINESS_BY_REGION_ID_STARTED';
export const ADD_BUSINESS_BY_REGION_ID_SUCCESS = 'ADD_BUSINESS_BY_REGION_ID_SUCCESS';
export const ADD_BUSINESS_BY_REGION_ID_FAILURE = 'ADD_BUSINESS_BY_REGION_ID_FAILURE';

export const FETCH_BUSINESSES_BY_REGION_ID_STARTED = 'FETCH_BUSINESSES_BY_REGION_ID_STARTED';
export const FETCH_BUSINESSES_BY_REGION_ID_SUCCESS = 'FETCH_BUSINESSES_BY_REGION_ID_SUCCESS';
export const FETCH_BUSINESSES_BY_REGION_ID_FAILURE = 'FETCH_BUSINESSES_BY_REGION_ID_FAILURE';

interface AddBusinessByRegionIdStartedAction {
  type: typeof ADD_BUSINESS_BY_REGION_ID_STARTED;
}

interface AddBusinessByRegionIdSuccessAction {
  type: typeof ADD_BUSINESS_BY_REGION_ID_SUCCESS;
  payload: {
    business: Business,
    regionId: string,
  };
}

interface AddBusinessByRegionIdFailureAction {
  type: typeof ADD_BUSINESS_BY_REGION_ID_FAILURE;
  payload: {
    error: Error,
  };
}

interface FetchBusinessesByRegionIdStartedAction {
  type: typeof FETCH_BUSINESSES_BY_REGION_ID_STARTED;
}

interface FetchBusinessesByRegionIdSuccessAction {
  type: typeof FETCH_BUSINESSES_BY_REGION_ID_SUCCESS;
  payload: {
    businesses: Business[],
    regionId: string,
  };
}

interface FetchBusinessesByRegionIdFailureAction {
  type: typeof FETCH_BUSINESSES_BY_REGION_ID_FAILURE;
  payload: {
    error: Error,
  };
}

export type BusinessActionTypes =
  AddBusinessByRegionIdStartedAction
  | AddBusinessByRegionIdSuccessAction
  | AddBusinessByRegionIdFailureAction
  | FetchBusinessesByRegionIdStartedAction
  | FetchBusinessesByRegionIdSuccessAction
  | FetchBusinessesByRegionIdFailureAction;

export type BusinessThunkResult = ThunkAction<void, RootState, undefined, BusinessActionTypes>;

export type BusinessThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface BusinessState {
  error?: Error | null;
  loading: boolean;
  businesses?: RegionBusiness | null;
}

export interface Business {
  name: string;
  year_added: number;
  region: string;
  employees: number;
  industry: string;
  location: number[];
}

export interface RegionBusiness {
  [regionId: string]: Business[];
}
