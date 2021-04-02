import { getHeaders } from '../helpers/headers';
import {
  SET_USER_SUCCESS,
  SET_USER_STARTED,
  SET_USER_FAILURE,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_STARTED,
  SET_USER_PROFILE_FAILURE,
  SET_USER_MANAGER_BY_ID_SUCCESS,
  SET_USER_MANAGER_BY_ID_STARTED,
  SET_USER_MANAGER_BY_ID_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_STARTED,
  FETCH_ALL_USERS_FAILURE,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_STARTED,
  FETCH_USER_BY_ID_FAILURE,
  UserProfile,
  AllUsersProfile,
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
        //Fetch user profile
        const userByIdUrl = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}`;
        const userProfileResponse = await fetch(
          userByIdUrl,
          {
            headers: getHeaders(auth0.token),
          }
        );
        const { app_metadata, user_metadata } = await userProfileResponse.json();

        const userProfile = user_metadata || null;
        const userRole = app_metadata && app_metadata.role ? app_metadata.role : 'region';
        const regionIds = app_metadata && app_metadata.manages ? app_metadata.manages : [];

        dispatch(setUserSuccess(userId, userProfile, userRole, regionIds));
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

const setUserSuccess = (id: string, profile: UserProfile, role: UserRole, regionIds: number[]) => ({
  type: SET_USER_SUCCESS,
  payload: {
    id,
    role,
    profile,
    regionIds,
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
          headers: getHeaders(auth0.token),
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

export const setUserManagerById = (userId: string, manages: string[]): UserThunkResult => {
  return async (dispatch: UserThunkDispatch, getState) => {
    dispatch(setUserManagerByIdStarted());
    const { auth0, user: userState, region: regionState } = getState();

    if (auth0.token !== null) {
      if (userState.allUsers && regionState.regions) {
        try {
          const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/users/${userId}`;
          const auth0Response = await fetch(
            api,
            {
              method: 'POST',
              headers: getHeaders(auth0.token),
              body: JSON.stringify({
                app_metadata: {
                  ...userState.allUsers[userId].role,
                  manages,
                },
              }),
            }
          );
          await auth0Response.json();

          // TODO support multiple region managers
          const regionName = regionState.regions.filter(region => {
            return region.id === manages[0];
          });
          const regionApi = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/regions/${manages[0]}`;
          const regionResponse = await fetch(
            regionApi,
            {
              method: 'POST',
              headers: getHeaders(auth0.token),
              body: JSON.stringify({
                id: manages[0],
                manager: userId,
                name: regionName[0].name,
              }),
            }
          );
          await regionResponse.json();

          dispatch(setUserManagerByIdSuccess(userId, manages));
        }
        catch (e) {
          dispatch(setUserManagerByIdFailure(e));
        }
      }
    }
    else {
      const noTokenError = new Error('Auth0 access token not set.');
      dispatch(setUserManagerByIdFailure(noTokenError));
    }
  };
};

const setUserManagerByIdStarted = () => ({
  type: SET_USER_MANAGER_BY_ID_STARTED,
});

const setUserManagerByIdSuccess = (userId: string, manages: string[]) => ({
  type: SET_USER_MANAGER_BY_ID_SUCCESS,
  payload: {
    userId,
    manages,
  },
});

const setUserManagerByIdFailure = (error: Error) => ({
  type: SET_USER_MANAGER_BY_ID_FAILURE,
  payload: {
    error,
  },
});

export const fetchAllUsers = (): UserThunkResult => {
  return async (dispatch: UserThunkDispatch, getState) => {
    dispatch(fetchAllUsersStarted());
    const { auth0 } = getState();

    if (auth0.token !== null) {
      try {
        const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/users`;
        const usersResponse = await fetch(
          api,
          {
            method: 'GET',
            headers: getHeaders(auth0.token),
          }
        );
        const data = await usersResponse.json();

        const users: AllUsersProfile = {};
        data.users.forEach(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore 
          user => {
            const userId = user.user_id.split('auth0|')[1];
            users[userId] = {
              id: userId,
              email: user.email,
              firstName: user.user_metadata.firstName,
              lastName: user.user_metadata.lastName,
              manages: user.app_metadata.manages ? user.app_metadata.manages : [],
              role: user.app_metadata.role,
            };
          }
        );

        dispatch(fetchAllUsersSuccess(users));
      }
      catch (e) {
        dispatch(fetchAllUsersFailure(e));
      }
    }
    else {
      const noTokenError = new Error('Auth0 access token not set.');
      dispatch(fetchAllUsersFailure(noTokenError));
    }
  };
};

const fetchAllUsersStarted = () => ({
  type: FETCH_ALL_USERS_STARTED,
});

const fetchAllUsersSuccess = (users: AllUsersProfile) => ({
  type: FETCH_ALL_USERS_SUCCESS,
  payload: {
    users,
  },
});

const fetchAllUsersFailure = (error: Error) => ({
  type: FETCH_ALL_USERS_FAILURE,
  payload: {
    error,
  },
});

export const fetchUserById = (id: string): UserThunkResult => {
  return async (dispatch: UserThunkDispatch, getState) => {
    dispatch(fetchUserByIdStarted());
    const { auth0 } = getState();

    if (auth0.token !== null) {
      try {
        //Fetch user profile
        const api = `${process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}/users/${id}`;
        const usersResponse = await fetch(
          api,
          {
            method: 'GET',
            headers: getHeaders(auth0.token),
          }
        );
        const data = await usersResponse.json();
        const profile = {
          firstName: data.userInfo.user_metadata.firstName,
          lastName: data.userInfo.user_metadata.lastName,
          email: data.userInfo.email,
          manages: data.userInfo.app_metadata.role,
        };
        dispatch(fetchUserByIdSuccess(id, profile));
      }
      catch (e) {
        dispatch(fetchUserByIdFailure(e));
      }
    }
    else {
      const noTokenError = new Error('Auth0 access token not set.');
      dispatch(setUserFailure(noTokenError));
    }
  };
};

const fetchUserByIdStarted = () => ({
  type: FETCH_USER_BY_ID_STARTED,
});

const fetchUserByIdSuccess = (id: string, profile: UserProfile) => ({
  type: FETCH_USER_BY_ID_SUCCESS,
  payload: {
    id,
    profile,
  },
});

const fetchUserByIdFailure = (error: Error) => ({
  type: FETCH_USER_BY_ID_FAILURE,
  payload: {
    error,
  },
});
