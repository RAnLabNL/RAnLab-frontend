import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setToken } from '../../store/actions/auth0';
import { setUser } from '../../store/actions/user';

type Props = {
  children: ReactElement,
};

const Auth0Redirect = ({ children }: Props): ReactElement => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useDispatch();
  const auth0 = useSelector((state: RootState) => state.auth0);
  const user = useSelector((state: RootState) => state.user);

  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        scope: 'read:current_user read:current_user_metadata update:current_user_metadata read:roles',
      });
      dispatch(setToken(accessToken));
    }
    catch (e) {
      dispatch(setToken(e));
    }
  };

  if (auth0.token === null && !auth0.loading) {
    getAccessToken();
  }

  useEffect(() => {
    if (auth0.token !== null && user.profile === null && !user.loading && auth0User) {
      dispatch(setUser(auth0User.sub));
    }
  }, [auth0.token]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  if (
    isLoading
    || auth0.loading
    || auth0.token === null
    || user.id === null
  ) {
    return (
      <div>Loading...</div>
    );
  }

  if (
    !isLoading
    && isAuthenticated
    && auth0.token !== null
    && user.id !== null
  ) {
    return children;
  }
  
  return <></>;
};

export default Auth0Redirect;
