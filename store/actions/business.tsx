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

export const addBusinessByRegionId = (id: number, business: Business): BusinessThunkResult => {
  return async (dispatch: BusinessThunkDispatch, getState) => {
    dispatch(addBusinessByRegionIdStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/${id}/businesses`;
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${auth0.apiToken}`,
          'Content-Type': 'application/json',
        },
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

const addBusinessByRegionIdSuccess = (business: Business, regionId: number) => {
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
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${auth0.apiToken}`,
          'Content-Type': 'application/json',
        },
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
