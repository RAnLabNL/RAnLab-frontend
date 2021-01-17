import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Button from '../base/Button';
import Typography from '../base/Typography';
import { fade } from '../../styles/helpers/color';
import createShadow from '../../styles/helpers/createShadow';

const useStyles = makeStyles(
  (theme) => ({
    iconButton: {
      border: `1px solid ${fade(theme.palette.primary.main, 0.75)}`,
      padding: '0.25em',
      position: 'relative',
      marginRight: theme.spacing(2),
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
    containerCount: {
      position: 'absolute',
      left: 'calc(100% - 1em)',
      bottom: '-0.5em',
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      fontSize: '0.5em',
      fontWeight: theme.typography.fontWeightBold,
      padding: '0.33em',
      borderRadius: '50%',
      textAlign: 'center',
      '& > span': {
        fontSize: 0,
      },
    },
    containerMenuHeader: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      alignItems: 'center',
      boxShadow: createShadow(fade(theme.palette.primary.dark, 0.8), 3),
    },
    typographyHeading: {
      fontSize: '0.9rem',
      color: theme.palette.primary.dark,
    },
    buttonViewAll: {
      whiteSpace: 'nowrap',
    },
    containerMenuItems: {
      maxHeight: '19rem',
      overflow: 'auto',
    },
    menuItem: {
      display: 'flex',
      fontSize: '1em',
      fontWeight: theme.typography.fontWeightBold,
      padding: theme.spacing(2),
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '& > div:not(:last-of-type)': {
        marginRight: theme.spacing(4),
      },
      '& small': {
        display: 'block',
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.5,
      },
    },
    menuItemUnread: {
      background: fade(theme.palette.secondary.light, 0.9),
      '&:hover': {
        background: fade(theme.palette.secondary.light, 0.85),
      },
    },
  })
);

const NotificationsMenu = (): ReactElement => {
  const { t } = useTranslation('components');
  const { t: tCommon } = useTranslation('common');
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const testCount = 12;
  const testNotifications = [
    {
      id: 1,
      region: 'St. John\'s',
      submittedDate: 'Jun 20, 2020',
      updatedDate: 'Jul 2, 2020',
      read: false,
    },
    {
      id: 2,
      region: 'St. John\'s',
      submittedDate: 'Jun 20, 2020',
      updatedDate: 'Jul 2, 2020',
      read: false,
    },
    {
      id: 3,
      region: 'St. John\'s',
      submittedDate: 'Jun 20, 2020',
      updatedDate: 'Jul 2, 2020',
      read: true,
    },
    {
      id: 4,
      region: 'St. John\'s',
      submittedDate: 'Jun 20, 2020',
      updatedDate: 'Jul 2, 2020',
      read: true,
    },
    {
      id: 5,
      region: 'St. John\'s',
      submittedDate: 'Jun 20, 2020',
      updatedDate: 'Jul 2, 2020',
      read: true,
    },
  ];

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
   * Returns rendered unread notification count
   */
  const getUnreadCount = (): string => {
    return testCount >= 100 ? '99+' : `${testCount}`;
  };

  return (
    <>
      <IconButton
        aria-label="notifications-menu-button-label"
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
        <NotificationsIcon fontSize="small" />
        <div className={classes.containerCount}>
          <span>{t('notifications-menu-unread')}</span>
          {getUnreadCount()}
        </div>
      </IconButton>
      <Menu
        MenuListProps={{
          disablePadding: true,
        }}
        id="notifications-menu"
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
        <div className={classes.containerMenuHeader}>
          <Typography
            className={classes.typographyHeading}
            variant="h2"
          >
            {t('notifications-menu-heading')}
          </Typography>
          <Button
            size="small"
            variant="outlined"
          >
            {t('notifications-menu-view-all')}
          </Button>
        </div>
        <div className={classes.containerMenuItems}>
          {
            testNotifications.map(notification => (
              <MenuItem
                className={classNames(
                  classes.menuItem,
                  {
                    [classes.menuItemUnread]: !notification.read,
                  }
                )}
                key={notification.id}
              >
                <div>
                  <small>
                    <Trans
                      i18nKey="notifications-menu-submitted"
                      ns="components"
                      values={{
                        date: notification.submittedDate,
                      }}
                    />
                  </small>
                  {notification.region}
                </div>
                <div>
                  <small>
                    <Trans
                      i18nKey="notifications-menu-updated"
                      ns="components"
                      values={{
                        date: notification.updatedDate,
                      }}
                    />
                  </small>
                  {tCommon('business-update-request-status-in-progress')}
                </div>
                <div>
                  <KeyboardArrowRightIcon />
                </div>
              </MenuItem>
            ))
          }
        </div>
      </Menu>
    </>
  );
};

export default NotificationsMenu;
