import { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './_i18n';

// Test Theme
const theme = createMuiTheme({
  palette: {
    background: {
      default: 'rgba(0,0,0,0.05)',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps): ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
