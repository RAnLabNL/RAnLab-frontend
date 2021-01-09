import { getHeaders } from '../helpers/headers';
import {
  ADD_REGION_SUCCESS,
  ADD_REGION_STARTED,
  ADD_REGION_FAILURE,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_STARTED,
  FETCH_REGIONS_FAILURE,
  SET_SELECTED_REGION_SUCCESS,
  SET_SELECTED_REGION_STARTED,
  SET_SELECTED_REGION_FAILURE,
  Region,
  RegionThunkResult,
  RegionThunkDispatch,
} from '../types/region';

export const addRegion = (
  { name, manager }: 
  { name: string, manager: string }
): RegionThunkResult => {
  return async (dispatch: RegionThunkDispatch, getState) => {
    dispatch(addRegionStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions`;
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: getHeaders(auth0.apiToken),
        body: JSON.stringify({ name, manager }),
      });

      const data = await response.json();
      dispatch(addRegionSuccess({ name, manager, id: data.regionId }));
    }
    catch (e) {
      dispatch(addRegionFailure(e));
    }
  };
};

const addRegionStarted = () => ({
  type: ADD_REGION_STARTED,
});

const addRegionSuccess = (region: Region) => {
  return {
    type: ADD_REGION_SUCCESS,
    payload: {
      region,
    },
  };
};

const addRegionFailure = (error: Error) => ({
  type: ADD_REGION_FAILURE,
  payload: {
    error,
  },
});

export const fetchRegions = (userId: string): RegionThunkResult => {
  return async (dispatch: RegionThunkDispatch, getState) => {
    dispatch(fetchRegionsStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/manager/${userId}`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.apiToken),
      });

      const data = await response.json();
      dispatch(fetchRegionsSuccess(data.regions));
    }
    catch (e) {
      dispatch(fetchRegionsFailure(e));
    }
  };
};

const fetchRegionsStarted = () => ({
  type: FETCH_REGIONS_STARTED,
});

const fetchRegionsSuccess = (regions: Region[]) => {
  return {
    type: FETCH_REGIONS_SUCCESS,
    payload: {
      regions,
    },
  };
};

const fetchRegionsFailure = (error: Error) => ({
  type: FETCH_REGIONS_FAILURE,
  payload: {
    error,
  },
});

export const setSelectedRegion = (selectedRegion: Region): RegionThunkResult => {
  return async (dispatch: RegionThunkDispatch, getState) => {
    dispatch(setSelectedRegionStarted());
    const { region: regionState } = getState();

    if (regionState.regions) {
      const validRegion = regionState.regions.filter((region: Region) => {
        return region.id === selectedRegion.id;
      });

      if (validRegion.length) {
        dispatch(setSelectedRegionSuccess(selectedRegion));
      }
      else {
        dispatch(setSelectedRegionFailure(new Error('Selected region does not exist.')));
      }
    }
    else {
      dispatch(setSelectedRegionFailure(new Error('User-managed regions unknown.')));
    }
  };
};

const setSelectedRegionStarted = () => ({
  type: SET_SELECTED_REGION_STARTED,
});

const setSelectedRegionSuccess = (selectedRegion: Region) => {
  return {
    type: SET_SELECTED_REGION_SUCCESS,
    payload: {
      selectedRegion,
    },
  };
};

const setSelectedRegionFailure = (error: Error) => ({
  type: SET_SELECTED_REGION_FAILURE,
  payload: {
    error,
  },
});
