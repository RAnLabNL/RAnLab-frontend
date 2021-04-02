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
  BusinessEditActionTypes,
  BusinessEditState,
  Status,
} from '../types/businessEdit';
import {
  getNewBusinessEdits,
  updateBusinessEditStatus,
} from '../helpers/businessEdit';

const defaultEdits = {
  [Status.PENDING]: [],
  [Status.CLAIMED]: [],
  [Status.APPROVED]: [],
  [Status.DECLINED]: [],
  [Status.AMENDED]: [],
};

const initialState: BusinessEditState = {
  error: null,
  loading: false,
  fetched: false,
  businessEdits: defaultEdits,
  singleBusinessEdit: null,
};

const businessEditReducer = (
  state = initialState,
  action: BusinessEditActionTypes
): BusinessEditState => {
  const prevBusinessEdits = state.businessEdits ? state.businessEdits : defaultEdits;
  switch (action.type) {
    case ADD_BUSINESS_EDIT_STARTED:
    case FETCH_ALL_BUSINESS_EDITS_STARTED:
    case FETCH_BUSINESS_EDITS_BY_REGION_ID_STARTED:
    case FETCH_SINGLE_BUSINESS_EDIT_STARTED:
    case SET_BUSINESS_EDIT_STATUS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ADD_BUSINESS_EDIT_FAILURE:
    case FETCH_ALL_BUSINESS_EDITS_FAILURE:
    case FETCH_BUSINESS_EDITS_BY_REGION_ID_FAILURE:
    case FETCH_SINGLE_BUSINESS_EDIT_FAILURE:
    case SET_BUSINESS_EDIT_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_BUSINESS_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        singleBusinessEdit: action.payload.businessEdit,
        businessEdits: getNewBusinessEdits(
          prevBusinessEdits,
          action.payload.status,
          [action.payload.businessEdit],
        ),
      };
    case FETCH_ALL_BUSINESS_EDITS_SUCCESS:
    case FETCH_BUSINESS_EDITS_BY_REGION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        error: null,
        businessEdits: getNewBusinessEdits(
          prevBusinessEdits,
          action.payload.status,
          action.payload.businessEdits,
        ),
      };
    case FETCH_SINGLE_BUSINESS_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        singleBusinessEdit: action.payload.businessEdit,
      };
    case SET_BUSINESS_EDIT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        businessEdits: updateBusinessEditStatus(
          prevBusinessEdits,
          action.payload.businessEdit,
          action.payload.prevStatus,
          action.payload.newStatus,
        ),
        singleBusinessEdit: action.payload.businessEdit,
      };
    default:
      return state;
  }
};

export default businessEditReducer;
