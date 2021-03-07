import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../../base/Logo';
import TermsMenu from '../../base/TermsMenu';
import RegionMenu from '../RegionMenu';
import { fade } from '../../../styles/helpers/color';
import createShadow from '../../../styles/helpers/createShadow';
import { fontSmoothOn } from '../../../styles/helpers/extend';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '100vh',
      padding: `4.5rem ${theme.spacing(2)}px`,
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        padding: `0 ${theme.spacing(3)}px`,
      },
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacing(4)}px`,
      },
    },
    logo: {
      margin: `0 auto ${theme.spacing(2)}px`,
      maxWidth: '10rem',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    menuList: {
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        ...fontSmoothOn,
      },
    },
    menuItem: {
      padding: 0,
    },
    listItemIcon: {
      color: theme.palette.primary.contrastText,
      minWidth: 36,
      verticalAlign: 'top',
      [theme.breakpoints.up('sm')]: {
        color: theme.palette.primary.main,
      },
    },
    listItemLink: {
      color: 'inherit',
      display: 'block',
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      textDecoration: 'none',
      width: '100%',
      '&:visited, &:active': {
        color: 'inherit',
      },
    },
    containerBottom: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    containerDownloadReport: {
      padding: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
    buttonDownloadReport: {
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        background: theme.palette.background.paper,
        boxShadow: createShadow(theme.palette.text.primary, 1),
        color: theme.palette.primary.dark,
        '&:hover': {
          background: fade(theme.palette.background.paper, 0.2),
          color: theme.palette.primary.dark,
        },
      },
    },
    containerTermsMenu: {
      borderTop: `1px solid ${fade(theme.palette.background.paper, 0.75)}`,
      padding: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        borderColor: theme.palette.divider,
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
      },
    },
  }),
  { name: 'RanLabAdminSidebar' },
);

const AdminSidebar = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/admin">
        <Logo className={classes.logo} />
      </Link>
      <div>
        <RegionMenu />
      </div>

      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <Link href="/admin">
            <a className={classes.listItemLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <HomeIcon />
              </ListItemIcon>
              {t('admin-sidebar-home')}
            </a>
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Link href="/management">
            <a className={classes.listItemLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <BuildIcon />
              </ListItemIcon>
              {t('admin-sidebar-management')}
            </a>
          </Link>
        </MenuItem>
      </MenuList>

      <div className={classes.containerBottom}>
        <div className={classes.containerTermsMenu}>
          <TermsMenu isMenu />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
