import classNames from 'classnames';
import { ElementType, ReactElement } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { darken, fade } from '../../styles/helpers/color';
import createShadow from '../../styles/helpers/createShadow';

const useStyles = makeStyles(
  (theme) => ({
    containedSecondary: {
      boxShadow: createShadow(theme.palette.secondary.dark, 2),
      '&:hover': {
        boxShadow: createShadow(theme.palette.secondary.dark, 4),
      },
    },
    containedHighlight: {
      background: theme.palette.highlight.dark,
      boxShadow: createShadow(theme.palette.highlight.dark, 2),
      color: theme.palette.highlight.contrastText,
      '&:hover': {
        background: darken(theme.palette.highlight.dark, 0.15),
        boxShadow: createShadow(theme.palette.highlight.dark, 4),
        color: theme.palette.highlight.contrastText,
      },
    },
    containedInverted: {
      background: theme.palette.background.paper,
      boxShadow: createShadow(theme.palette.primary.dark, 2),
      color: theme.palette.primary.main,
      '&:hover': {
        background: fade(theme.palette.background.paper, 0.1),
        boxShadow: createShadow(theme.palette.primary.dark, 4),
      },
    },
    outlinedInverted: {
      borderColor: fade(theme.palette.background.paper, 0.5),
      color: theme.palette.background.paper,
      '&:hover': {
        background: fade(theme.palette.background.paper, 0.9),
      },
    },
    textInverted: {
      color: theme.palette.background.paper,
    },
  }),
  { name: 'RanLabButton' },
);

const Button = (props: ButtonProps): ReactElement => {
  const {
    className: classNameProp,
    classes: classesProp,
    color,
    variant,
    ...other
  } = props;
  const classes = useStyles();

  let colorProp;
  if (color === 'primary' || color === 'secondary') {
    colorProp = color;
  }

  return (
    <MuiButton
      {...other}
      className={classNames(
        classNameProp,
        {
          [classes.containedHighlight]: color === 'highlight' && variant === 'contained',
          [classes.containedInverted]: color === 'inverted' && variant === 'contained',
          [classes.outlinedInverted]: color === 'inverted' && variant === 'outlined',
          [classes.textInverted]: color === 'inverted' && variant === 'text',
        }
      )}
      classes={{
        containedSecondary: classes.containedSecondary,
        ...classesProp,
      }}
      color={colorProp}
      variant={variant}
    >
    </MuiButton>
  );
};

export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
  color?: 'inherit' | 'primary' | 'secondary' | 'highlight' | 'lowlight' | 'inverted';
  component?: ElementType;
}

export default Button;
