// Extend createMuiThene module to include gradients
import {
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    gradients?: Gradient;
  }

  interface Theme {
    gradients: Gradient;
  }

  interface Gradient {
    [key: string]: string;
  }
}
