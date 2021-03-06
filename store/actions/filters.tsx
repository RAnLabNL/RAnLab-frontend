import { getHeaders } from '../helpers/headers';
import {
  FETCH_INDUSTRY_FILTERS_SUCCESS,
  FETCH_INDUSTRY_FILTERS_STARTED,
  FETCH_INDUSTRY_FILTERS_FAILURE,
  FETCH_YEAR_FILTERS_SUCCESS,
  FETCH_YEAR_FILTERS_STARTED,
  FiltersThunkResult,
  FiltersThunkDispatch,
} from '../types/filters';

export const fetchIndustryFilters = (): FiltersThunkResult => {
  return async (dispatch: FiltersThunkDispatch, getState) => {
    dispatch(fetchIndustryFiltersStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/filters/industries`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.token),
      });

      const data = await response.json();
      dispatch(fetchIndustryFiltersSuccess(data.industries));
    }
    catch (e) {
      dispatch(fetchIndustryFiltersFailure(e));
    }
  };
};

const fetchIndustryFiltersStarted = () => ({
  type: FETCH_INDUSTRY_FILTERS_STARTED,
});

const fetchIndustryFiltersSuccess = (industries: string[]) => {
  return {
    type: FETCH_INDUSTRY_FILTERS_SUCCESS,
    payload: {
      industries,
    },
  };
};

const fetchIndustryFiltersFailure = (error: Error) => ({
  type: FETCH_INDUSTRY_FILTERS_FAILURE,
  payload: {
    error,
  },
});

export const fetchYearFilters = (): FiltersThunkResult => {
  return (dispatch: FiltersThunkDispatch) => {
    dispatch(fetchYearFiltersStarted());
    // TODO update with years from API
    const years = [2019, 2020, 2021];
    dispatch(fetchYearFiltersSuccess(years));
  };
};

const fetchYearFiltersStarted = () => ({
  type: FETCH_YEAR_FILTERS_STARTED,
});

const fetchYearFiltersSuccess = (years: number[]) => {
  return {
    type: FETCH_YEAR_FILTERS_SUCCESS,
    payload: {
      years,
    },
  };
};
