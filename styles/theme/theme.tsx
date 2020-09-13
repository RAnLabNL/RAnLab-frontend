import { createMuiTheme } from '@material-ui/core/styles';

import palette from './_palette';
import shadows from './_shadows';
import typography from './_typography';

const theme = createMuiTheme({
  palette,
  shadows,
  typography,
});

export default theme;
