import {
  FETCH_TOUR_BY_ID_SUCCESS,
  FETCH_TOUR_BY_ID_STARTED,
  FETCH_TOUR_BY_ID_FAILURE,
  TourActionTypes,
  TourState,
} from '../types/tour';

const initialState: TourState = {
  error: null,
  loading: false,
  tours: [],
};

const TourReducer = (
  state = initialState,
  action: TourActionTypes
): TourState => {
  const prevTours = state.tours ? state.tours : [];
  switch (action.type) {
    case FETCH_TOUR_BY_ID_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TOUR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tours: [
          ...prevTours,
          action.payload.tour,
        ],
      };
    case FETCH_TOUR_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default TourReducer;
