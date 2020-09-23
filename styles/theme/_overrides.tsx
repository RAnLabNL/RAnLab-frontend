import { darken, fade } from '../helpers/color';
import { primaryDark } from './_palette';

const overrides = {
  MuiBackdrop: {
    root: {
      backgroundColor: fade(darken(primaryDark, 0.5), 0.25),
    },
  },
};

export default overrides;
