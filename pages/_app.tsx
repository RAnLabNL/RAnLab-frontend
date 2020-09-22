import { ReactNode, useEffect } from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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

  return (
    <ThemeProvider theme={theme}>
      <ViewportProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ViewportProvider>
    </ThemeProvider>
  );
};

export default MyApp;
