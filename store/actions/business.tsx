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
} from '../types/business';

export const addBusinessByRegionId = (id: string, business: Business): BusinessThunkResult => {
  return async (dispatch: BusinessThunkDispatch, getState) => {
    dispatch(addBusinessByRegionIdStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/businesses`;
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: getHeaders(auth0.apiToken),
        body: JSON.stringify(business),
      });

      const data = await response.json();
      console.log('add business success', data);
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

export const fetchBusinessesByRegionId = (id: number): BusinessThunkResult => {
  return async (dispatch: BusinessThunkDispatch, getState) => {
    dispatch(fetchBusinessesByRegionIdStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/${id}/businesses`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.apiToken),
      });

      const data = await response.json();
      dispatch(fetchBusinessesByRegionIdSuccess(data, id));
      console.log(data);
    }
    catch (e) {
      dispatch(fetchBusinessesByRegionIdFailure(e));
    }
  };
};

const fetchBusinessesByRegionIdStarted = () => ({
  type: FETCH_BUSINESSES_BY_REGION_ID_STARTED,
});

const fetchBusinessesByRegionIdSuccess = (businesses: Business[], regionId: number) => {
  return {
    type: FETCH_BUSINESSES_BY_REGION_ID_SUCCESS,
    payload: {
      businesses,
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
