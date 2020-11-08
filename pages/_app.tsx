import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode, useEffect } from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Auth0Redirect from '../components/base/Auth0Redirect';
import { wrapper } from '../store/store';
import theme from '../styles/theme/theme';
import '../translations/i18n';

const ViewportProvider = dynamic(
  () => import('../providers/viewport'),
  { ssr: false },
);

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const redirectUri = process.browser ? window.location.origin : '';

  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN || ''}
      clientId={process.env.AUTH0_CLIENT_ID || ''}
      redirectUri={redirectUri}
      scope="read:current_user read:current_user_metadata update:current_user_metadata"
    >
      <ThemeProvider theme={theme}>
        <ViewportProvider>
          <CssBaseline />
          <Auth0Redirect>
            <Component {...pageProps} />
          </Auth0Redirect>
        </ViewportProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default wrapper.withRedux(MyApp);
