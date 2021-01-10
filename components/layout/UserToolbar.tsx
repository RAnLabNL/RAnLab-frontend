import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import { MouseEvent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../base/Logo';
import UserMenu from './UserMenu';
import RegionTourButton from './region-layout/RegionTourButton';

type Props = {
  onMenuButtonClick: (e: MouseEvent<HTMLButtonElement>) => void,
  type?: 'region' | 'admin',
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
    menuContainer: {
      [theme.breakpoints.down('xs')]: {
        flex: '1 1 100%',
      },
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
      alignItems: 'center',
      display: 'flex',
      flex: '1 1 100%',
      justifyContent: 'space-between',
      padding: `0 ${theme.spacing(1)}px`,
      [theme.breakpoints.down('xs')]: {
        display: 'block',
        flex: 'auto',
        whiteSpace: 'nowrap',
      },
    },
  }),
  { name: 'RanLabUserToolbar' },
);

const UserToolbar = ({ onMenuButtonClick, type = 'region' }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <div className={classes.container}>
        <div className={classes.menuContainer}>
          <IconButton
            color="inherit"
            aria-label={t('region-toolbar-toggle-menu')}
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
          {
            type === 'region'
              ? <RegionTourButton />
              : <div />
          }
          <UserMenu />
        </div>
      </div>
    </Toolbar>
  );
};

export default UserToolbar;
