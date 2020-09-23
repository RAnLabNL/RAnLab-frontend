import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import { MouseEvent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../../components/Logo';
import UserMenu from '../../components/UserMenu';

type Props = {
  onMenuButtonClick: (e: MouseEvent<HTMLButtonElement>) => void,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: 0,
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    logoContainer: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '5rem',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    actionsContainer: {
      paddingRight: theme.spacing(1),
    },
  })
);

const RegionToolbar = ({ onMenuButtonClick }: Props): ReactElement => {
  const { t } = useTranslation('layouts');
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <div className={classes.container}>
        <div>
          <IconButton
            color="inherit"
            aria-label={t('region-toggle-menu')}
            onClick={onMenuButtonClick}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoContainer}>
            <Link href="/region">
              <Logo variant="standalone" />
            </Link>
          </div>
        </div>
        <div className={classes.actionsContainer}>
          <UserMenu />
        </div>
      </div>
    </Toolbar>
  );
};

export default RegionToolbar;
