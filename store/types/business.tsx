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
    filters: Filters,
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
  filters?: Filters | null;
}

// Needed to dynamically key in a Business
interface BusinessField {
  [key: string]: string | number | number[];
}

export interface Business extends BusinessField {
  id: string;
  name: string;
  year_added: number;
  regionId: string;
  employees: number;
  industry: string;
  location: number[] | string;
}

export interface IndustryFilter {
  count: number;
  industry: string;
}

export interface YearFilter {
  count: number;
  year: number;
}

export interface Filters {
  industries: IndustryFilter[],
  years: YearFilter[],
}

export interface RegionBusiness {
  [regionId: string]: {
    businesses: Business[];
    filters: Filters;
  }
}
