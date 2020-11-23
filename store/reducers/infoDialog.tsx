import {
  FETCH_INFO_DIALOG_BY_ID_SUCCESS,
  FETCH_INFO_DIALOG_BY_ID_STARTED,
  FETCH_INFO_DIALOG_BY_ID_FAILURE,
  InfoDialogActionTypes,
  InfoDialogState,
} from '../types/infoDialog';

const initialState: InfoDialogState = {
  error: null,
  loading: false,
  dialogs: [],
};

const infoDialogReducer = (
  state = initialState,
  action: InfoDialogActionTypes
): InfoDialogState => {
  const prevInfoDialogs = state.dialogs ? state.dialogs : [];
  switch (action.type) {
    case FETCH_INFO_DIALOG_BY_ID_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INFO_DIALOG_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dialogs: [
          ...prevInfoDialogs,
          action.payload.infoDialog,
        ],
      };
    case FETCH_INFO_DIALOG_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default infoDialogReducer;
