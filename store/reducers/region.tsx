import { getNewRegions } from '../helpers/region';
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
  RegionActionTypes,
  RegionState,
} from '../types/region';

const initialState: RegionState = {
  error: null,
  loading: false,
};

const regionReducer = (
  state = initialState,
  action: RegionActionTypes
): RegionState => {
  const prevRegions = state.regions ? state.regions : [];
  switch (action.type) {
    case ADD_REGION_STARTED:
    case FETCH_REGIONS_STARTED:
    case SET_SELECTED_REGION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ADD_REGION_FAILURE:
    case FETCH_REGIONS_FAILURE:
    case SET_SELECTED_REGION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_REGION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        regions: getNewRegions(
          prevRegions,
          action.payload.region,
        ),
      };
    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        regions: [
          ...prevRegions,
          ...action.payload.regions,
        ],
      };
    case SET_SELECTED_REGION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedRegion: action.payload.selectedRegion,
      };
    default:
      return state;
  }
};

export default regionReducer;
