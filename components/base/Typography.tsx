import { ReactElement, ElementType } from 'react';
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    h1: {
      marginBottom: theme.spacing(2),
    },
  }),
  { name: 'RanLabTypography' },
);

const Typography = (props: TypographyProps): ReactElement => {
  const {
    classes: classesProp,
    ...other
  } = props;
  const classes = useStyles();

  return (
    <MuiTypography
      {...other}
      classes={{
        h1: classes.h1,
        ...classesProp,
      }}
    />
  );
};

export interface TypographyProps extends MuiTypographyProps {
  component?: ElementType;
}

export default Typography;
