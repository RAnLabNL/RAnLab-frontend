import Prismic from 'prismic-javascript';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { Document } from 'prismic-javascript/types/documents';
import {
  FETCH_INFO_DIALOG_BY_ID_SUCCESS,
  FETCH_INFO_DIALOG_BY_ID_STARTED,
  FETCH_INFO_DIALOG_BY_ID_FAILURE,
  InfoDialogThunkResult,
  InfoDialogThunkDispatch,
} from '../types/infoDialog';

export const fetchInfoDialogById = (id: string): InfoDialogThunkResult => {
  return async (dispatch: InfoDialogThunkDispatch) => {
    dispatch(fetchInfoDialogByIdStarted());

    Prismic.api(`https://${process.env.NEXT_PUBLIC_PRISMIC_REPO}.cdn.prismic.io/api/v2`).then(
      api => {
        const query = Prismic.Predicates.at('my.info_dialog.uid', id);
        api.query(query).then(
          (response: ApiSearchResponse) => {
            if (response.results.length === 1) {
              const infoDialog = response.results[0];
              dispatch(fetchInfoDialogByIdSuccess(infoDialog));
            }
            else {
              const error = new Error(
                response.results.length
                  ? `Found multiple Prismic documents for given id ${id}.`
                  : `Could not find a Prismic document for given id. ${id}`
              );
              dispatch(fetchInfoDialogByIdFailure(error));
            }
          },
          error => {
            dispatch(fetchInfoDialogByIdFailure(error));
          }
        );
      },
      error => {
        dispatch(fetchInfoDialogByIdFailure(error));
      }
    );
  };
};

const fetchInfoDialogByIdStarted = () => ({
  type: FETCH_INFO_DIALOG_BY_ID_STARTED,
});

const fetchInfoDialogByIdSuccess = (infoDialog: Document) => {
  return {
    type: FETCH_INFO_DIALOG_BY_ID_SUCCESS,
    payload: {
      infoDialog,
    },
  };
};

const fetchInfoDialogByIdFailure = (error: Error) => ({
  type: FETCH_INFO_DIALOG_BY_ID_FAILURE,
  payload: {
    error,
  },
});
