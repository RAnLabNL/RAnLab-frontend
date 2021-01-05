import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Document } from 'prismic-javascript/types/documents';
import { RichTextBlock } from 'prismic-reactjs';

import { RootState } from '../reducers/root';

export const FETCH_TOUR_BY_ID_STARTED = 'FETCH_TOUR_BY_ID_STARTED';
export const FETCH_TOUR_BY_ID_SUCCESS = 'FETCH_TOUR_BY_ID_SUCCESS';
export const FETCH_TOUR_BY_ID_FAILURE = 'FETCH_TOUR_BY_ID_FAILURE';

interface FetchTourByIdStartedAction {
  type: typeof FETCH_TOUR_BY_ID_STARTED;
}

interface FetchTourByIdSuccessAction {
  type: typeof FETCH_TOUR_BY_ID_SUCCESS;
  payload: {
    tour: Document,
  };
}

interface FetchTourByIdFailureAction {
  type: typeof FETCH_TOUR_BY_ID_FAILURE;
  payload: {
    error: Error,
  };
}

export type TourActionTypes =
  FetchTourByIdStartedAction
  | FetchTourByIdSuccessAction
  | FetchTourByIdFailureAction;

export type TourThunkResult = ThunkAction<void, RootState, undefined, TourActionTypes>;

export type TourThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface TourState {
  error?: Error | null;
  loading: boolean;
  tours?: Document[] | null;
}

export interface TourStep {
  step_id: string;
  description: RichTextBlock[];
}



