import {
  SET_USER_SUCCESS,
  SET_USER_STARTED,
  SET_USER_FAILURE,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_STARTED,
  SET_USER_PROFILE_FAILURE,
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
          authorization: `Bearer ${auth0.token}`,
        };

        //Fetch user profile
        const userByIdUrl = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}`;
        const userProfileResponse = await fetch(userByIdUrl, { headers });
        const { app_metadata, user_metadata } = await userProfileResponse.json();

        const userProfile = user_metadata || null;
        const userRole = app_metadata && app_metadata.role ? app_metadata.role : 'region';

        dispatch(setUserSuccess(userId, userProfile, userRole));
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

const setUserSuccess = (id: string, profile: UserProfile, role: UserRole) => ({
  type: SET_USER_SUCCESS,
  payload: {
    id,
    role,
    profile,
  },
});

const setUserFailure = (error: Error) => ({
  type: SET_USER_FAILURE,
  payload: {
    error,
  },
});

export const setUserProfile = (profile: UserProfile): UserThunkResult => {
  return async (dispatch: UserThunkDispatch, getState) => {
    dispatch(setUserProfileStarted());
    const { auth0 } = getState();
    const { user } = getState();

    if (auth0.token !== null) {
      try {
        const fetchSettings = {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${auth0.token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ user_metadata: profile }),
        };

        const userByIdUrl = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${user.id}`;
        await fetch(userByIdUrl, fetchSettings);

        dispatch(setUserProfileSuccess(profile));
      }
      catch (e) {
        dispatch(setUserProfileFailure(e));
      }
    }
    else {
      const noTokenError = new Error('Auth0 access token not set.');
      dispatch(setUserProfileFailure(noTokenError));
    }
  };
};

const setUserProfileStarted = () => ({
  type: SET_USER_PROFILE_STARTED,
});

const setUserProfileSuccess = (profile: UserProfile) => ({
  type: SET_USER_PROFILE_SUCCESS,
  payload: {
    profile,
  },
});

const setUserProfileFailure = (error: Error) => ({
  type: SET_USER_PROFILE_FAILURE,
  payload: {
    error,
  },
});
