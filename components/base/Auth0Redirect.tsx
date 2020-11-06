import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement, useEffect } from 'react';

type Props = {
  children: ReactElement,
};

const Auth0Redirect = ({ children }: Props): ReactElement => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!isLoading && isAuthenticated) {
    return children;
  }
  
  return <></>;
};

export default Auth0Redirect;
