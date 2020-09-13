import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { fade } from '../styles/helpers/color';

const useStyles = makeStyles(
  (theme) => ({
    root: {},
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
      '&:first-of-type': {
        borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.9)}`,
      },
    },
  })
);

const UserMenu = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classNames(
          classes.iconButton,
          {
            [classes.iconButtonActive]: Boolean(anchorEl),
          },
        )}
        onClick={handleClick}
      >
        <PersonIcon fontSize="small" />
      </IconButton>
      <Menu
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
          {t('user-menu-profile')}
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          {t('user-menu-log-out')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
