import { ReactElement } from 'react';
import {
  Button as MuiButton,
  ButtonProps,
} from '@material-ui/core';

const Button = (props: ButtonProps): ReactElement => (
  <MuiButton {...props}>
  </MuiButton>
);

export default Button;