import { useAuth0 } from '@auth0/auth0-react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { fade } from '../../styles/helpers/color';

const useStyles = makeStyles(
  (theme) => ({
    iconButton: {
      border: `1px solid ${fade(theme.palette.primary.main, 0.75)}`,
      padding: '0.25em',
      [theme.breakpoints.up('sm')]: {
        borderColor: fade(theme.palette.primary.contrastText, 0.5),
      },
    },
    iconButtonActive: {
      background: fade(theme.palette.primary.main, 0.9),
      [theme.breakpoints.up('sm')]: {
        background: fade(theme.palette.primary.contrastText, 0.8),
      },
    },
    menuItem: {
      fontSize: '0.9rem',
      minHeight: 'none',
      padding: 0,
      '&:first-of-type': {
        borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.9)}`,
      },
    },
    menuItemLink: {
      background: 'transparent',
      border: 'none',
      fontSize: 'inherit',
      textDecoration: 'none',
      color: theme.palette.text.primary,
      cursor: 'pointer',
      padding: theme.spacing(2),
      '&:visited': {
        color: theme.palette.text.primary,
      },
      '&:hover': {
        color: theme.palette.primary.main,
      },
      '&:focus, &:active': {
        outline: 'none',
      },
    },
  }),
  { name: 'RanLabUserMenu' },
);

const UserMenu = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const { logout } = useAuth0();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  /**
   * Fired on user menu icon button click
   * @param e Target event
   */
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  /**
   * Fired when user menu closes
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Logs current user out
   */
  const handleLogOut = () => {
    const returnTo = process.browser ? window.location.origin : '';
    logout({ returnTo });
  };

  return (
    <>
      <IconButton
        color="inherit"
        className={classNames(
          classes.iconButton,
          {
            [classes.iconButtonActive]: Boolean(anchorEl),
          },
        )}
        id="main-tour-step-user-menu"
        onClick={handleClick}
      >
        <PersonIcon fontSize="small" />
      </IconButton>
      <Menu
        MenuListProps={{
          disablePadding: true,
        }}
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem className={classes.menuItem}>
          <Link href="/profile">
            <a className={classes.menuItemLink}>
              {t('user-menu-profile')}
            </a>
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <button
            className={classes.menuItemLink}
            onClick={handleLogOut}
          >
            {t('user-menu-log-out')}
          </button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
