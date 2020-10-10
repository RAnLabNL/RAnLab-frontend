import { createMuiTheme } from '@material-ui/core/styles';

import overrides from './_overrides';
import palette from './_palette';
import shadows from './_shadows';
import typography from './_typography';

const theme = createMuiTheme({
  overrides,
  palette,
  shadows,
  typography,
});

export default theme;
