import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ReactElement } from 'react';

import Logo from '../../components/Logo';
import RegionMenu from '../../components/RegionMenu';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: `4.5rem ${theme.spacing(2)}px`,
      [theme.breakpoints.up('sm')]: {
        padding: `0 ${theme.spacing(3)}px`,
      },
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacing(4)}px`,
      },
    },
    logo: {
      margin: '0 auto',
      maxWidth: '10rem',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  })
);

const componentName = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/region">
        <Logo className={classes.logo} />
      </Link>
      <RegionMenu />
    </div>
  );
};

export default componentName;
