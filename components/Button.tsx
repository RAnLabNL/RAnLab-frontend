import { ReactElement } from 'react';
import {
  Button as MuiButton,
  ButtonProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import createShadow from '../styles/helpers/createShadow';

const useStyles = makeStyles(
  (theme) => ({
    containedSecondary: {
      boxShadow: createShadow(theme.palette.secondary.dark, 2),
      '&:hover': {
        boxShadow: createShadow(theme.palette.secondary.dark, 4),
      },
    },
  })
);

const Button = (props: ButtonProps): ReactElement => {
  const {
    classes: classesProp,
    ...other
  } = props;
  const classes = useStyles();

  return (
    <MuiButton
      {...other}
      classes={{
        containedSecondary: classes.containedSecondary,
        ...classesProp,
      }}
    >
    </MuiButton>
  );
};

export default Button;
