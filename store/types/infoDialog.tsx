import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Document } from 'prismic-javascript/types/documents';

import { RootState } from '../reducers/root';

export const FETCH_INFO_DIALOG_BY_ID_STARTED = 'FETCH_INFO_DIALOG_BY_ID_STARTED';
export const FETCH_INFO_DIALOG_BY_ID_SUCCESS = 'FETCH_INFO_DIALOG_BY_ID_SUCCESS';
export const FETCH_INFO_DIALOG_BY_ID_FAILURE = 'FETCH_INFO_DIALOG_BY_ID_FAILURE';

interface FetchInfoDialogByIdStartedAction {
  type: typeof FETCH_INFO_DIALOG_BY_ID_STARTED;
}

interface FetchInfoDialogByIdSuccessAction {
  type: typeof FETCH_INFO_DIALOG_BY_ID_SUCCESS;
  payload: {
    infoDialog: Document,
  };
}

interface FetchInfoDialogByIdFailureAction {
  type: typeof FETCH_INFO_DIALOG_BY_ID_FAILURE;
  payload: {
    error: Error,
  };
}

export type InfoDialogActionTypes =
  FetchInfoDialogByIdStartedAction
  | FetchInfoDialogByIdSuccessAction
  | FetchInfoDialogByIdFailureAction;

export type InfoDialogThunkResult = ThunkAction<void, RootState, undefined, InfoDialogActionTypes>;

export type InfoDialogThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface InfoDialogState {
  error?: Error | null;
  loading: boolean;
  dialogs?: Document[] | null;
}



