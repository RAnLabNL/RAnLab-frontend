// Extend createPalette module to include new color options
import {
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    highlight?: PaletteColorOptions;
    lowlight?: PaletteColorOptions;
  }

  interface Palette {
    highlight: PaletteColor;
    lowlight: PaletteColor;
  }
}
