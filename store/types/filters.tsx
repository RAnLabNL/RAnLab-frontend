import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import { RootState } from '../reducers/root';

export const FETCH_INDUSTRY_FILTERS_STARTED = 'FETCH_INDUSTRY_FILTERS_STARTED';
export const FETCH_INDUSTRY_FILTERS_SUCCESS = 'FETCH_INDUSTRY_FILTERS_SUCCESS';
export const FETCH_INDUSTRY_FILTERS_FAILURE = 'FETCH_INDUSTRY_FILTERS_FAILURE';

interface FetchIndustryFiltersStartedAction {
  type: typeof FETCH_INDUSTRY_FILTERS_STARTED;
}

interface FetchIndustryFiltersSuccessAction {
  type: typeof FETCH_INDUSTRY_FILTERS_SUCCESS;
  payload: {
    industries: string[],
  };
}

interface FetchIndustryFiltersFailureAction {
  type: typeof FETCH_INDUSTRY_FILTERS_FAILURE;
  payload: {
    error: Error,
  };
}

export type FiltersActionTypes =
  FetchIndustryFiltersStartedAction
  | FetchIndustryFiltersSuccessAction
  | FetchIndustryFiltersFailureAction;

export type FiltersThunkResult = ThunkAction<void, RootState, undefined, FiltersActionTypes>;

export type FiltersThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface FiltersState {
  error?: Error | null;
  loading: boolean;
  industries?: string[];
}
