import { lighten, darken } from '../helpers/color';

const dark = '#202020';
const light = '#fff';
const background = '#F4F8FF';

const primary = '#0052CC';
const secondary = '#E63881';
const highlight = '#47CFDE';
const lowlight = '#0052CC';

const palette = {
  background: {
    default: background,
  },
  primary: {
    light: lighten(primary, 0.15),
    main: primary,
    dark: darken(primary, 0.15),
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
    contrastText: dark,
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
};

export default palette;
