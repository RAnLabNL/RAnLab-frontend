import { getHeaders } from '../helpers/headers';
import { Business } from '../types/business';
import {
  ADD_BUSINESS_EDIT_SUCCESS,
  ADD_BUSINESS_EDIT_STARTED,
  ADD_BUSINESS_EDIT_FAILURE,
  FETCH_ALL_BUSINESS_EDITS_SUCCESS,
  FETCH_ALL_BUSINESS_EDITS_STARTED,
  FETCH_ALL_BUSINESS_EDITS_FAILURE,
  FETCH_SINGLE_BUSINESS_EDIT_SUCCESS,
  FETCH_SINGLE_BUSINESS_EDIT_STARTED,
  FETCH_SINGLE_BUSINESS_EDIT_FAILURE,
  SET_BUSINESS_EDIT_STATUS_SUCCESS,
  SET_BUSINESS_EDIT_STATUS_STARTED,
  SET_BUSINESS_EDIT_STATUS_FAILURE,
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
        const { adds, updates, deletes: deletesBusinesses } = transactions;
        const deletes: string[] = [];

        deletesBusinesses.forEach((business: Business) => {
          if (business.id) {
            deletes.push(business.id);
          }
        });

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
            dateSubmitted: data.dateSubmitted,
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
