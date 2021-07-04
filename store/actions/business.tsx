import { getHeaders } from '../helpers/headers';
import {
  ADD_BUSINESS_BY_REGION_ID_SUCCESS,
  ADD_BUSINESS_BY_REGION_ID_STARTED,
  ADD_BUSINESS_BY_REGION_ID_FAILURE,
  FETCH_BUSINESSES_BY_REGION_ID_SUCCESS,
  FETCH_BUSINESSES_BY_REGION_ID_STARTED,
  FETCH_BUSINESSES_BY_REGION_ID_FAILURE,
  Business,
  BusinessThunkResult,
  BusinessThunkDispatch,
  Filters,
} from '../types/business';

export const addBusinessByRegionId = (id: string, business: Business): BusinessThunkResult => {
  return async (dispatch: BusinessThunkDispatch, getState) => {
    dispatch(addBusinessByRegionIdStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/${id}/businesses`;
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: getHeaders(auth0.token),
        body: JSON.stringify(business),
      });

      await response.json();
      dispatch(addBusinessByRegionIdSuccess(business, id));
    }
    catch (e) {
      dispatch(addBusinessByRegionIdFailure(e));
    }
  };
};

const addBusinessByRegionIdStarted = () => ({
  type: ADD_BUSINESS_BY_REGION_ID_STARTED,
});

const addBusinessByRegionIdSuccess = (business: Business, regionId: string) => {
  return {
    type: ADD_BUSINESS_BY_REGION_ID_SUCCESS,
    payload: {
      business,
      regionId,
    },
  };
};

const addBusinessByRegionIdFailure = (error: Error) => ({
  type: ADD_BUSINESS_BY_REGION_ID_FAILURE,
  payload: {
    error,
  },
});

export const fetchBusinessesByRegionId = (id: string): BusinessThunkResult => {
  return async (dispatch: BusinessThunkDispatch, getState) => {
    dispatch(fetchBusinessesByRegionIdStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/${id}/businesses`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.token),
      });

      const data = await response.json();

      dispatch(fetchBusinessesByRegionIdSuccess(
        data.businesses,
        data.filters,
        id,
      ));
    }
    catch (e) {
      dispatch(fetchBusinessesByRegionIdFailure(e));
    }
  };
};

const fetchBusinessesByRegionIdStarted = () => ({
  type: FETCH_BUSINESSES_BY_REGION_ID_STARTED,
});

const fetchBusinessesByRegionIdSuccess = (
  businesses: Business[],
  filters: Filters,
  regionId: string
) => {
  return {
    type: FETCH_BUSINESSES_BY_REGION_ID_SUCCESS,
    payload: {
      businesses,
      filters,
      regionId,
    },
  };
};

const fetchBusinessesByRegionIdFailure = (error: Error) => ({
  type: FETCH_BUSINESSES_BY_REGION_ID_FAILURE,
  payload: {
    error,
  },
});
