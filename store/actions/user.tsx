import {
  SET_USER_SUCCESS,
  SET_USER_STARTED,
  SET_USER_FAILURE,
  UserProfile,
  UserRole,
  UserThunkResult,
  UserThunkDispatch,
} from '../types/user';

export const setUser = (userId: string): UserThunkResult => {
  return async (dispatch: UserThunkDispatch, getState) => {
    dispatch(setUserStarted());
    const { auth0 } = getState();

    if (auth0.token !== null) {
      try {
        const headers = {
          Authorization: `Bearer ${auth0.token}`,
        };

        //Fetch user profile
        const userByIdUrl = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`;
        const userProfileResponse = await fetch(userByIdUrl, { headers });
        const { app_metadata, user_metadata } = await userProfileResponse.json();

        dispatch(setUserSuccess(user_metadata, app_metadata.role));
      }
      catch (e) {
        dispatch(setUserFailure(e));
      }
    }
    else {
      const noTokenError = new Error('Auth0 access token not set.');
      dispatch(setUserFailure(noTokenError));
    }
  };
};

const setUserStarted = () => ({
  type: SET_USER_STARTED,
});

const setUserSuccess = (profile: UserProfile, role: UserRole) => {
  return {
    type: SET_USER_SUCCESS,
    payload: {
      role,
      profile,
    },
  };
};

const setUserFailure = (error: Error) => ({
  type: SET_USER_FAILURE,
  payload: {
    error,
  },
});
