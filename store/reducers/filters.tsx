import {
  FETCH_INDUSTRY_FILTERS_SUCCESS,
  FETCH_INDUSTRY_FILTERS_STARTED,
  FETCH_INDUSTRY_FILTERS_FAILURE,
  FiltersActionTypes,
  FiltersState,
} from '../types/filters';

const initialState: FiltersState = {
  error: null,
  loading: false,
};

const filtersReducer = (
  state = initialState,
  action: FiltersActionTypes
): FiltersState => {
  switch (action.type) {
    case FETCH_INDUSTRY_FILTERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INDUSTRY_FILTERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FETCH_INDUSTRY_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        industries: action.payload.industries,
      };
    default:
      return state;
  }
};

export default filtersReducer;
