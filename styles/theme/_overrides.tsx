import { darken, fade } from '../helpers/color';
import { highlightDark, primary, primaryDark } from './_palette';

const overrides = {
  MuiBackdrop: {
    root: {
      backgroundColor: fade(darken(primaryDark, 0.5), 0.25),
    },
  },
  MuiButton: {
    root: {
      textTransform: 'none' as const,
    },
  },
  MuiCard: {
    root: {
      borderRadius: 10,
    },
  },
  MuiCssBaseline: {
    '@global': {
      a: {
        color: primary,
        transition: 'color 0.1s',
        '&:active, &:visited': {
          color: primary,
        },
        '&:hover': {
          color: highlightDark,
        },
      },
    },
  },
};

export default overrides;
