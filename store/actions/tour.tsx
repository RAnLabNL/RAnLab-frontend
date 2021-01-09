import Prismic from 'prismic-javascript';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { Document } from 'prismic-javascript/types/documents';
import {
  FETCH_TOUR_BY_ID_SUCCESS,
  FETCH_TOUR_BY_ID_STARTED,
  FETCH_TOUR_BY_ID_FAILURE,
  TourThunkResult,
  TourThunkDispatch,
} from '../types/tour';

export const fetchTourById = (id: string): TourThunkResult => {
  return async (dispatch: TourThunkDispatch) => {
    dispatch(fetchTourByIdStarted());

    Prismic.api(`https://${process.env.NEXT_PUBLIC_PRISMIC_REPO}.cdn.prismic.io/api/v2`).then(
      api => {
        const query = Prismic.Predicates.at('my.tour.uid', id);
        api.query(query).then(
          (response: ApiSearchResponse) => {
            if (response.results.length === 1) {
              const tour = response.results[0];
              dispatch(fetchTourByIdSuccess(tour));
            }
            else {
              const error = new Error(
                response.results.length
                  ? `Found multiple Prismic documents for given id ${id}.`
                  : `Could not find a Prismic document for given id. ${id}`
              );
              dispatch(fetchTourByIdFailure(error));
            }
          },
          error => {
            dispatch(fetchTourByIdFailure(error));
          }
        );
      },
      error => {
        dispatch(fetchTourByIdFailure(error));
      }
    );
  };
};

const fetchTourByIdStarted = () => ({
  type: FETCH_TOUR_BY_ID_STARTED,
});

const fetchTourByIdSuccess = (tour: Document) => {
  return {
    type: FETCH_TOUR_BY_ID_SUCCESS,
    payload: {
      tour,
    },
  };
};

const fetchTourByIdFailure = (error: Error) => ({
  type: FETCH_TOUR_BY_ID_FAILURE,
  payload: {
    error,
  },
});
