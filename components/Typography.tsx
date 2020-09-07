import { ReactElement } from 'react';
import {
  Typography as MuiTypography,
  TypographyProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    h1: {
      color: theme.palette.primary.main,
    },
  })
);

const Typography = (props: TypographyProps): ReactElement => {
  const {
    classes,
    ...other
  } = props;
  const styles = useStyles();

  return (
    <MuiTypography
      {...other}
      classes={{
        h1: styles.h1,
        ...classes,
      }}
    />
  );
};

export default Typography;
