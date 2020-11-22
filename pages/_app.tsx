import { Auth0Provider } from '@auth0/auth0-react';
import { create } from 'jss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import {
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactNode, useEffect } from 'react';

import Auth0Redirect from '../components/base/Auth0Redirect';
import { wrapper } from '../store/store';
import globals from '../styles/globals/globals';
import theme from '../styles/theme/theme';
import '../translations/i18n';

// Import CSS from external libraries
// Known issue in @zeit/next-css if imports aren't performed
// at the app level then dev server Link components will not work
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ViewportProvider = dynamic(
  () => import('../providers/viewport'),
  { ssr: false },
);

const jssGlobals = create().setup(jssPreset());

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    jssGlobals.createStyleSheet(
      globals,
      { meta: 'RanLabGlobals' },
    ).attach();
  }, []);

  const redirectUri = process.browser ? window.location.origin : '';

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      redirectUri={redirectUri}
      audience={`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`}
      scope="read:current_user read:current_user_metadata update:current_user_metadata read:roles"
    >
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <ViewportProvider>
            <CssBaseline />
            <Auth0Redirect>
              <Component {...pageProps} />
            </Auth0Redirect>
          </ViewportProvider>
        </ThemeProvider>
      </StylesProvider>
    </Auth0Provider>
  );
};

export default wrapper.withRedux(MyApp);
