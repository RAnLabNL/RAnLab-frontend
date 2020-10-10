import { createMuiTheme } from '@material-ui/core/styles';

import gradients from './_gradients';
import overrides from './_overrides';
import palette from './_palette';
import shadows from './_shadows';
import shape from './_shape';
import typography from './_typography';

const theme = createMuiTheme({
  gradients,
  overrides,
  palette,
  shadows,
  shape,
  typography,
});

export default theme;
