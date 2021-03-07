import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import { RootState } from '../reducers/root';

export const ADD_REGION_STARTED = 'ADD_REGION_STARTED';
export const ADD_REGION_SUCCESS = 'ADD_REGION_SUCCESS';
export const ADD_REGION_FAILURE = 'ADD_REGION_FAILURE';

export const FETCH_REGIONS_STARTED = 'FETCH_REGIONS_STARTED';
export const FETCH_REGIONS_SUCCESS = 'FETCH_REGIONS_SUCCESS';
export const FETCH_REGIONS_FAILURE = 'FETCH_REGIONS_FAILURE';

export const SET_SELECTED_REGION_STARTED = 'SET_SELECTED_REGION_STARTED';
export const SET_SELECTED_REGION_SUCCESS = 'SET_SELECTED_REGION_SUCCESS';
export const SET_SELECTED_REGION_FAILURE = 'SET_SELECTED_REGION_FAILURE';

interface AddRegionStartedAction {
  type: typeof ADD_REGION_STARTED;
}

interface AddRegionSuccessAction {
  type: typeof ADD_REGION_SUCCESS;
  payload: {
    region: Region,
  };
}

interface AddRegionFailureAction {
  type: typeof ADD_REGION_FAILURE;
  payload: {
    error: Error,
  };
}

interface FetchRegionsStartedAction {
  type: typeof FETCH_REGIONS_STARTED;
}

interface FetchRegionsSuccessAction {
  type: typeof FETCH_REGIONS_SUCCESS;
  payload: {
    regions: Region[],
  };
}

interface FetchRegionsFailureAction {
  type: typeof FETCH_REGIONS_FAILURE;
  payload: {
    error: Error,
  };
}

interface SetSelectedRegionStartedAction {
  type: typeof SET_SELECTED_REGION_STARTED;
}

interface SetSelectedRegionSuccessAction {
  type: typeof SET_SELECTED_REGION_SUCCESS;
  payload: {
    selectedRegion: Region,
  };
}

interface SetSelectedRegionFailureAction {
  type: typeof SET_SELECTED_REGION_FAILURE;
  payload: {
    error: Error,
  };
}

export type RegionActionTypes =
  AddRegionStartedAction
  | AddRegionSuccessAction
  | AddRegionFailureAction
  | FetchRegionsStartedAction
  | FetchRegionsSuccessAction
  | FetchRegionsFailureAction
  | SetSelectedRegionStartedAction
  | SetSelectedRegionSuccessAction
  | SetSelectedRegionFailureAction;

export type RegionThunkResult = ThunkAction<void, RootState, undefined, RegionActionTypes>;

export type RegionThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface RegionState {
  error?: Error | null;
  loading: boolean;
  regions?: Region[];
  selectedRegion?: Region | 'all';
}

export interface Region {
  id: string;
  name: string;
  manager: string;
}
