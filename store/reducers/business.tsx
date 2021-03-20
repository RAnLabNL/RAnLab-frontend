import { getNewBusinesses } from '../helpers/business';
import {
  ADD_BUSINESS_BY_REGION_ID_SUCCESS,
  ADD_BUSINESS_BY_REGION_ID_STARTED,
  ADD_BUSINESS_BY_REGION_ID_FAILURE,
  FETCH_BUSINESSES_BY_REGION_ID_SUCCESS,
  FETCH_BUSINESSES_BY_REGION_ID_STARTED,
  FETCH_BUSINESSES_BY_REGION_ID_FAILURE,
  BusinessActionTypes,
  BusinessState,
} from '../types/business';

const initialState: BusinessState = {
  error: null,
  loading: false,
  businesses: {},
};

const businessReducer = (
  state = initialState,
  action: BusinessActionTypes
): BusinessState => {
  const prevBusinesses = state.businesses ? state.businesses : {};
  switch (action.type) {
    case ADD_BUSINESS_BY_REGION_ID_STARTED:
    case FETCH_BUSINESSES_BY_REGION_ID_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ADD_BUSINESS_BY_REGION_ID_FAILURE:
    case FETCH_BUSINESSES_BY_REGION_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_BUSINESS_BY_REGION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        businesses: getNewBusinesses(
          prevBusinesses,
          action.payload.regionId,
          action.payload.business,
        ),
      };
    case FETCH_BUSINESSES_BY_REGION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        businesses: {
          ...prevBusinesses,
          [action.payload.regionId]: {
            businesses: action.payload.businesses,
            filters: action.payload.filters,
          },
        },
      };
    default:
      return state;
  }
};

export default businessReducer;
