import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { setToken } from '../store/actions/auth0';
import { setUser } from '../store/actions/user';

const Home = (): ReactElement => {
  const {
    user: auth0User,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useDispatch();
  const router = useRouter();
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
    if (auth0.token !== null && user.profile === null && !user.loading) {
      dispatch(setUser(auth0User.sub));
    }
  }, [auth0.token]);

  useEffect(() => {
    if (user.role !== null) {
      router.push(`/${user.role}`);
    }
  }, [user.role]);

  return (
    <div>Loading...</div>
  );
};

export default Home;
