import { 
  fade,
  lighten,
  darken,
} from '../helpers/color';

export const dark = '#202020';
export const light = '#fff';
export const background = '#F4F8FF';

export const primary = '#0052CC';
export const primaryDark = darken(primary, 0.15);
export const secondary = '#E63881';
export const highlight = '#47CFDE';
export const lowlight = '#0052CC';

const palette = {
  background: {
    default: background,
  },
  primary: {
    light: lighten(primary, 0.15),
    main: primary,
    dark: primaryDark,
    contrastText: light,
  },
  secondary: {
    light: lighten(secondary, 0.15),
    main: secondary,
    dark: darken(secondary, 0.15),
    contrastText: light,
  },
  highlight: {
    light: lighten(highlight, 0.15),
    main: highlight,
    dark: darken(highlight, 0.15),
    contrastText: light,
  },
  lowlight: {
    light: lighten(lowlight, 0.15),
    main: lowlight,
    dark: darken(lowlight, 0.15),
    contrastText: light,
  },
  text: {
    primary: dark,
  },
  divider: fade(primaryDark, 0.88),
  action: {
    hover: fade(primaryDark, 0.96),
    selected: fade(primaryDark, 0.92),
  },
};

export default palette;
