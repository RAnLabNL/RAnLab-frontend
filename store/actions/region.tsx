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
  GET_SELECTED_REGION_SUCCESS,
  GET_SELECTED_REGION_STARTED,
  GET_SELECTED_REGION_FAILURE,
  Region,
  RegionThunkResult,
  RegionThunkDispatch,
  LS_SELECTED_REGION,
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
        headers: getHeaders(auth0.token),
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

export const fetchRegions = (): RegionThunkResult => {
  return async (dispatch: RegionThunkDispatch, getState) => {
    dispatch(fetchRegionsStarted());
    const { auth0, user } = getState();
    if (user && user.id) {
      const userId = user.id.split('auth0|')[1];
      const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/manager/${userId}`;
      try {
        const response = await fetch(api, {
          method: 'GET',
          headers: getHeaders(auth0.token),
        });

        const data = await response.json();
        dispatch(fetchRegionsSuccess(data.regions));
      }
      catch (e) {
        dispatch(fetchRegionsFailure(e));
      }
    }
    else {
      dispatch(fetchRegionsFailure(new Error('User ID not found')));
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

export const setSelectedRegion = (selectedRegion: Region | 'all'): RegionThunkResult => {
  return async (dispatch: RegionThunkDispatch, getState) => {
    dispatch(setSelectedRegionStarted());
    const { region: regionState } = getState();

    if (selectedRegion === 'all') {
      window.localStorage.setItem(LS_SELECTED_REGION, selectedRegion);
      dispatch(setSelectedRegionSuccess('all'));
    }
    else {
      if (regionState.regions) {
        const validRegion = regionState.regions.filter((region: Region) => {
          return region.id === selectedRegion.id;
        });
  
        if (validRegion.length) {
          window.localStorage.setItem(LS_SELECTED_REGION, selectedRegion.id);
          dispatch(setSelectedRegionSuccess(selectedRegion));
        }
        else {
          dispatch(setSelectedRegionFailure(new Error('Selected region does not exist.')));
        }
      }
      else {
        dispatch(setSelectedRegionFailure(new Error('User-managed regions unknown.')));
      }
    }
  };
};

const setSelectedRegionStarted = () => ({
  type: SET_SELECTED_REGION_STARTED,
});

const setSelectedRegionSuccess = (selectedRegion: Region | 'all') => {
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

export const getSelectedRegion = (): RegionThunkResult => {
  return async (dispatch: RegionThunkDispatch, getState) => {
    dispatch(getSelectedRegionStarted());
    const { region: regionState, user: userState } = getState();
    const selectedRegion = window.localStorage.getItem(LS_SELECTED_REGION);

    // If selected region found in LS
    if (selectedRegion) {
      if (selectedRegion === 'all') {
        dispatch(getSelectedRegionSuccess('all'));
      }
      else {
        
        if (regionState.regions) {
          const validRegion = regionState.regions.filter((region: Region) => {
            return region.id === selectedRegion;
          });
    
          if (validRegion.length) {
            dispatch(getSelectedRegionSuccess(validRegion[0]));
          }
          else {
            dispatch(getSelectedRegionFailure(new Error('Selected region does not exist.')));
          }
        }
        else {
          dispatch(getSelectedRegionFailure(new Error('User-managed regions unknown.')));
        }
      }
    }
    // Not found in LS
    else {
      if (userState.role === 'admin') {
        window.localStorage.setItem(LS_SELECTED_REGION, 'all');
        dispatch(getSelectedRegionSuccess('all'));
      }
      else {
        if (regionState.regions) {
          window.localStorage.setItem(LS_SELECTED_REGION, regionState.regions[0].id);
          dispatch(getSelectedRegionSuccess(regionState.regions[0]));
        }
        else {
          dispatch(getSelectedRegionFailure(new Error('User-managed regions unknown.')));
        }
      }
    }
  };
};

const getSelectedRegionStarted = () => ({
  type: GET_SELECTED_REGION_STARTED,
});

const getSelectedRegionSuccess = (selectedRegion: Region | 'all') => {
  return {
    type: GET_SELECTED_REGION_SUCCESS,
    payload: {
      selectedRegion,
    },
  };
};

const getSelectedRegionFailure = (error: Error) => ({
  type: GET_SELECTED_REGION_FAILURE,
  payload: {
    error,
  },
});
