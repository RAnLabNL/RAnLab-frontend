import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, ReactNode } from 'react';

import Logo from '../base/Logo';
import TermsMenu from '../base/TermsMenu';

type Props = {
  children?: ReactNode,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: '0 auto',
      maxWidth: '35rem',
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
      },
    },
    containerLogo: {
      margin: `0 auto ${theme.spacing(3)}px`,
      maxWidth: '10rem',
    },
    containerTerms: {
      padding: theme.spacing(2),
    },
  }),
  { name: 'RanLabProfileSetupLayout' },
);

const ProfileSetupLayout = ({ children }: Props): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.containerLogo}>
          <Logo />
        </div>
        {children}
      </Paper>
      <div className={classes.containerTerms}>
        <TermsMenu />
      </div>
    </div>
  );
};

export default ProfileSetupLayout;
