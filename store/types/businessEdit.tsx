import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import { RootState } from '../reducers/root';
import { Business } from './business';

export const ADD_BUSINESS_EDIT_STARTED = 'ADD_BUSINESS_EDIT_STARTED';
export const ADD_BUSINESS_EDIT_SUCCESS = 'ADD_BUSINESS_EDIT_SUCCESS';
export const ADD_BUSINESS_EDIT_FAILURE = 'ADD_BUSINESS_EDIT_FAILURE';

export const FETCH_ALL_BUSINESS_EDITS_STARTED = 'FETCH_ALL_BUSINESS_EDITS_STARTED';
export const FETCH_ALL_BUSINESS_EDITS_SUCCESS = 'FETCH_ALL_BUSINESS_EDITS_SUCCESS';
export const FETCH_ALL_BUSINESS_EDITS_FAILURE = 'FETCH_ALL_BUSINESS_EDITS_FAILURE';

export const FETCH_BUSINESS_EDITS_BY_REGION_ID_STARTED = 'FETCH_BUSINESS_EDITS_BY_REGION_ID_STARTED';
export const FETCH_BUSINESS_EDITS_BY_REGION_ID_SUCCESS = 'FETCH_BUSINESS_EDITS_BY_REGION_ID_SUCCESS';
export const FETCH_BUSINESS_EDITS_BY_REGION_ID_FAILURE = 'FETCH_BUSINESS_EDITS_BY_REGION_ID_FAILURE';

export const FETCH_SINGLE_BUSINESS_EDIT_STARTED = 'FETCH_SINGLE_BUSINESS_EDIT_STARTED';
export const FETCH_SINGLE_BUSINESS_EDIT_SUCCESS = 'FETCH_SINGLE_BUSINESS_EDIT_SUCCESS';
export const FETCH_SINGLE_BUSINESS_EDIT_FAILURE = 'FETCH_SINGLE_BUSINESS_EDIT_FAILURE';

export const SET_BUSINESS_EDIT_STATUS_STARTED = 'SET_BUSINESS_EDIT_STATUS_STARTED';
export const SET_BUSINESS_EDIT_STATUS_SUCCESS = 'SET_BUSINESS_EDIT_STATUS_SUCCESS';
export const SET_BUSINESS_EDIT_STATUS_FAILURE = 'SET_BUSINESS_EDIT_STATUS_FAILURE';

interface AddBusinessEditStartedAction {
  type: typeof ADD_BUSINESS_EDIT_STARTED;
}

interface AddBusinessEditSuccessAction {
  type: typeof ADD_BUSINESS_EDIT_SUCCESS;
  payload: {
    businessEdit: BusinessEdit,
    status: Status,
  };
}

interface AddBusinessEditFailureAction {
  type: typeof ADD_BUSINESS_EDIT_FAILURE;
  payload: {
    error: Error,
  };
}

interface FetchAllBusinessEditsStartedAction {
  type: typeof FETCH_ALL_BUSINESS_EDITS_STARTED;
}

interface FetchAllBusinessEditsSuccessAction {
  type: typeof FETCH_ALL_BUSINESS_EDITS_SUCCESS;
  payload: {
    businessEdits: BusinessEdit[],
    status: Status,
  };
}

interface FetchAllBusinessEditsFailureAction {
  type: typeof FETCH_ALL_BUSINESS_EDITS_FAILURE;
  payload: {
    error: Error,
  };
}

interface FetchBusinessEditsByRegionIdStartedAction {
  type: typeof FETCH_BUSINESS_EDITS_BY_REGION_ID_STARTED;
}

interface FetchBusinessEditsByRegionIdSuccessAction {
  type: typeof FETCH_BUSINESS_EDITS_BY_REGION_ID_SUCCESS;
  payload: {
    businessEdits: BusinessEdit[],
    status: Status,
  };
}

interface FetchBusinessEditsByRegionIdFailureAction {
  type: typeof FETCH_BUSINESS_EDITS_BY_REGION_ID_FAILURE;
  payload: {
    error: Error,
  };
}

interface FetchSingleBusinessEditStartedAction {
  type: typeof FETCH_SINGLE_BUSINESS_EDIT_STARTED;
}

interface FetchSingleBusinessEditSuccessAction {
  type: typeof FETCH_SINGLE_BUSINESS_EDIT_SUCCESS;
  payload: {
    businessEdit: BusinessEdit,
    status: Status,
  };
}

interface FetchSingleBusinessEditFailureAction {
  type: typeof FETCH_SINGLE_BUSINESS_EDIT_FAILURE;
  payload: {
    error: Error,
  };
}

interface SetBusinessEditStatusStartedAction {
  type: typeof SET_BUSINESS_EDIT_STATUS_STARTED;
}

interface SetBusinessEditStatusSuccessAction {
  type: typeof SET_BUSINESS_EDIT_STATUS_SUCCESS;
  payload: {
    businessEdit: BusinessEdit,
    prevStatus: Status,
    newStatus: Status,
  };
}

interface SetBusinessEditStatusFailureAction {
  type: typeof SET_BUSINESS_EDIT_STATUS_FAILURE;
  payload: {
    error: Error,
  };
}

export type BusinessEditActionTypes =
  AddBusinessEditStartedAction
  | AddBusinessEditSuccessAction
  | AddBusinessEditFailureAction
  | FetchAllBusinessEditsStartedAction
  | FetchAllBusinessEditsSuccessAction
  | FetchAllBusinessEditsFailureAction
  | FetchBusinessEditsByRegionIdStartedAction
  | FetchBusinessEditsByRegionIdSuccessAction
  | FetchBusinessEditsByRegionIdFailureAction
  | FetchSingleBusinessEditStartedAction
  | FetchSingleBusinessEditSuccessAction
  | FetchSingleBusinessEditFailureAction
  | SetBusinessEditStatusStartedAction
  | SetBusinessEditStatusSuccessAction
  | SetBusinessEditStatusFailureAction;

export type BusinessEditThunkResult = ThunkAction<void, RootState, undefined, BusinessEditActionTypes>;

export type BusinessEditThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface BusinessEditState {
  error?: Error | null;
  loading: boolean;
  fetched: boolean;
  businessEdits?: StatusBusinessEdit | null;
  singleBusinessEdit?: BusinessEdit | null;
}

export interface BusinessEditTransactions {
  adds: Business[],
  updates: Business[],
  deletes: Business[],
}

export interface BusinessEdit extends BusinessEditTransactions, BusinessEditProperty {
  id?: string,
  regionId: string,
  submitter: string,
  dateSubmitted: string,
  dateUpdated?: string,
  status?: Status,
}

// Needed to dynamically get a key in a BusinessEdit
interface BusinessEditProperty {
  [key: string]: string | Business[] | undefined;
}

export enum Status {
  PENDING = 'Pending',
  CLAIMED = 'In Progress',
  APPROVED = 'Approved',
  DECLINED = 'Declined',
  AMENDED = 'Amended',
}

export type StatusBusinessEdit = {
  [key in Status]: BusinessEdit[];
};

export enum EditTransactionStatus {
  ADDED = 'added',
  DELETED = 'deleted',
  UPDATED = 'updated',
}
