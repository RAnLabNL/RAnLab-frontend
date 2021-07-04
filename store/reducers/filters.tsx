import {
  FETCH_INDUSTRY_FILTERS_SUCCESS,
  FETCH_INDUSTRY_FILTERS_STARTED,
  FETCH_INDUSTRY_FILTERS_FAILURE,
  FETCH_YEAR_FILTERS_SUCCESS,
  FETCH_YEAR_FILTERS_STARTED,
  FETCH_YEAR_FILTERS_FAILURE,
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
    case FETCH_YEAR_FILTERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INDUSTRY_FILTERS_FAILURE:
    case FETCH_YEAR_FILTERS_FAILURE:
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
    case FETCH_YEAR_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        years: action.payload.years,
      };
    default:
      return state;
  }
};

export default filtersReducer;
