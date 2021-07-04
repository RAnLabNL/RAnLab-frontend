import moment from 'moment';

import { getHeaders } from '../helpers/headers';
import { Region } from '../types/region';
import {
  ADD_BUSINESS_EDIT_SUCCESS,
  ADD_BUSINESS_EDIT_STARTED,
  ADD_BUSINESS_EDIT_FAILURE,
  FETCH_ALL_BUSINESS_EDITS_SUCCESS,
  FETCH_ALL_BUSINESS_EDITS_STARTED,
  FETCH_ALL_BUSINESS_EDITS_FAILURE,
  FETCH_BUSINESS_EDITS_BY_REGION_ID_SUCCESS,
  FETCH_BUSINESS_EDITS_BY_REGION_ID_STARTED,
  FETCH_BUSINESS_EDITS_BY_REGION_ID_FAILURE,
  FETCH_SINGLE_BUSINESS_EDIT_SUCCESS,
  FETCH_SINGLE_BUSINESS_EDIT_STARTED,
  FETCH_SINGLE_BUSINESS_EDIT_FAILURE,
  SET_BUSINESS_EDIT_STATUS_SUCCESS,
  SET_BUSINESS_EDIT_STATUS_STARTED,
  SET_BUSINESS_EDIT_STATUS_FAILURE,
  AMEND_BUSINESS_EDIT_SUCCESS,
  AMEND_BUSINESS_EDIT_STARTED,
  AMEND_BUSINESS_EDIT_FAILURE,
  BusinessEdit,
  BusinessEditTransactions,
  BusinessEditThunkResult,
  BusinessEditThunkDispatch,
  Status,
} from '../types/businessEdit';

export const addBusinessEdit = (transactions: BusinessEditTransactions): BusinessEditThunkResult => {
  return async (dispatch: BusinessEditThunkDispatch, getState) => {
    dispatch(addBusinessEditStarted());
    const { auth0, region, user } = getState();
    if (region.selectedRegion && region.selectedRegion !== 'all') {
      if (user && user.id) {
        const regionId = region.selectedRegion.id;
        const { adds, updates, deletes } = transactions;

        const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/region/${regionId}/edits`;
        try {
          const businessEditInfo = {
            regionId,
            submitter: user.id.split('auth0|')[1],
            status: Status.PENDING,
          };
          const response = await fetch(api, {
            method: 'POST',
            headers: getHeaders(auth0.token),
            body: JSON.stringify({
              ...businessEditInfo,
              adds,
              updates,
              deletes,
            }),
          });

          const data = await response.json();
          const businessEditWithId = {
            id: data.id,
            dateSubmitted: moment().format(),
            dateUpdated: moment().format(),
            ...businessEditInfo,
            ...transactions,
          };
          dispatch(addBusinessEditSuccess(businessEditWithId));
        }
        catch (e) {
          dispatch(addBusinessEditFailure(e));
        }
      }
      else {
        dispatch(addBusinessEditFailure(new Error('No user found')));
      }
    }
    else {
      dispatch(addBusinessEditFailure(new Error('No region selected')));
    }
  };
};

const addBusinessEditStarted = () => ({
  type: ADD_BUSINESS_EDIT_STARTED,
});

const addBusinessEditSuccess = (businessEdit: BusinessEdit) => {
  return {
    type: ADD_BUSINESS_EDIT_SUCCESS,
    payload: {
      businessEdit,
      status: Status.PENDING,
    },
  };
};

const addBusinessEditFailure = (error: Error) => ({
  type: ADD_BUSINESS_EDIT_FAILURE,
  payload: {
    error,
  },
});

export const fetchAllBusinessEdits = (): BusinessEditThunkResult => {
  return async (dispatch: BusinessEditThunkDispatch, getState) => {
    dispatch(fetchAllBusinessEditsStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/edits/all`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.token),
      });

      const data = await response.json();
      dispatch(fetchAllBusinessEditsSuccess(data.editRequests));
    }
    catch (e) {
      dispatch(fetchAllBusinessEditsFailure(e));
    }
  };
};

const fetchAllBusinessEditsStarted = () => ({
  type: FETCH_ALL_BUSINESS_EDITS_STARTED,
});

const fetchAllBusinessEditsSuccess = (businessEdits: BusinessEdit[]) => {
  return {
    type: FETCH_ALL_BUSINESS_EDITS_SUCCESS,
    payload: {
      businessEdits,
    },
  };
};

const fetchAllBusinessEditsFailure = (error: Error) => ({
  type: FETCH_ALL_BUSINESS_EDITS_FAILURE,
  payload: {
    error,
  },
});

export const fetchBusinessEditsByRegionId = (regionId: string): BusinessEditThunkResult => {
  return async (dispatch: BusinessEditThunkDispatch, getState) => {
    dispatch(fetchBusinessEditsByRegionIdStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/region/${regionId}/edits`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.token),
      });

      const data = await response.json();
      dispatch(fetchBusinessEditsByRegionIdSuccess(data.editRequests));
    }
    catch (e) {
      dispatch(fetchBusinessEditsByRegionIdFailure(e));
    }
  };
};

const fetchBusinessEditsByRegionIdStarted = () => ({
  type: FETCH_BUSINESS_EDITS_BY_REGION_ID_STARTED,
});

const fetchBusinessEditsByRegionIdSuccess = (businessEdits: BusinessEdit[]) => {
  return {
    type: FETCH_BUSINESS_EDITS_BY_REGION_ID_SUCCESS,
    payload: {
      businessEdits,
    },
  };
};

const fetchBusinessEditsByRegionIdFailure = (error: Error) => ({
  type: FETCH_BUSINESS_EDITS_BY_REGION_ID_FAILURE,
  payload: {
    error,
  },
});

export const fetchSingleBusinessEdit = (id: string): BusinessEditThunkResult => {
  return async (dispatch: BusinessEditThunkDispatch, getState) => {
    dispatch(fetchSingleBusinessEditStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/edits/${id}`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: getHeaders(auth0.token),
      });

      const data = await response.json();
      dispatch(fetchSingleBusinessEditSuccess(data.editRequest));
    }
    catch (e) {
      dispatch(fetchSingleBusinessEditFailure(e));
    }
  };
};

const fetchSingleBusinessEditStarted = () => ({
  type: FETCH_SINGLE_BUSINESS_EDIT_STARTED,
});

const fetchSingleBusinessEditSuccess = (businessEdit: BusinessEdit) => {
  return {
    type: FETCH_SINGLE_BUSINESS_EDIT_SUCCESS,
    payload: {
      businessEdit,
    },
  };
};

const fetchSingleBusinessEditFailure = (error: Error) => ({
  type: FETCH_SINGLE_BUSINESS_EDIT_FAILURE,
  payload: {
    error,
  },
});

export const setBusinessEditStatus = (id: string, prevStatus: Status, newStatus: Status): BusinessEditThunkResult => {
  return async (dispatch: BusinessEditThunkDispatch, getState) => {
    dispatch(setBusinessEditStatusStarted());
    const { auth0 } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/edits/${id}`;
    // TODO - investigate approval workflow issues
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: getHeaders(auth0.token),
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();
      dispatch(setBusinessEditStatusSuccess(data.editRequest, prevStatus, newStatus));
    }
    catch (e) {
      dispatch(setBusinessEditStatusFailure(e));
    }
  };
};

const setBusinessEditStatusStarted = () => ({
  type: SET_BUSINESS_EDIT_STATUS_STARTED,
});

const setBusinessEditStatusSuccess = (
  businessEdit: BusinessEdit,
  prevStatus: Status,
  newStatus: Status,
) => {
  return {
    type: SET_BUSINESS_EDIT_STATUS_SUCCESS,
    payload: {
      businessEdit,
      prevStatus,
      newStatus,
    },
  };
};

const setBusinessEditStatusFailure = (error: Error) => ({
  type: SET_BUSINESS_EDIT_STATUS_FAILURE,
  payload: {
    error,
  },
});

export const amendBusinessEdit = (id: string, transactions: BusinessEditTransactions): BusinessEditThunkResult => {
  return async (dispatch: BusinessEditThunkDispatch, getState) => {
    dispatch(amendBusinessEditStarted());
    const {
      auth0,
      businessEdit: businessEditState,
    } = getState();
    const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/edits/${id}`;
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: getHeaders(auth0.token),
        body: JSON.stringify({
          status: Status.AMENDED,
        }),
      });
      const originalResponse = await response.json();

      if (businessEditState.singleBusinessEdit) {
        const regionId = businessEditState.singleBusinessEdit.regionId;
        const pendingApi = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/region/${regionId}/edits`;
        const pendingResponse = await fetch(pendingApi, {
          method: 'POST',
          headers: getHeaders(auth0.token),
          body: JSON.stringify({
            ...businessEditState.singleBusinessEdit,
            ...transactions,
          }),
        });
        const pendingData = await pendingResponse.json();

        const approvedApi = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/edits/${pendingData.id}`;
        const approvedResponse = await fetch(approvedApi, {
          method: 'POST',
          headers: getHeaders(auth0.token),
          body: JSON.stringify({
            status: Status.APPROVED,
          }),
        });

        await approvedResponse.json();
        dispatch(amendBusinessEditSuccess(originalResponse.editRequest, Status.PENDING, Status.AMENDED));
      }
      else {
        dispatch(amendBusinessEditFailure(new Error('Single business edit not found.')));
      }
    }
    catch (e) {
      dispatch(amendBusinessEditFailure(e));
    }
  };
};

const amendBusinessEditStarted = () => ({
  type: AMEND_BUSINESS_EDIT_STARTED,
});

const amendBusinessEditSuccess = (
  businessEdit: BusinessEdit,
  prevStatus: Status,
  newStatus: Status,
) => {
  return {
    type: AMEND_BUSINESS_EDIT_SUCCESS,
    payload: {
      businessEdit,
      prevStatus,
      newStatus,
    },
  };
};

const amendBusinessEditFailure = (error: Error) => ({
  type: AMEND_BUSINESS_EDIT_FAILURE,
  payload: {
    error,
  },
});

