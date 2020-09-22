import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import Link from 'next/link';
import { ReactElement } from 'react';

import Logo from '../../components/Logo';
import RegionMenu from '../../components/RegionMenu';
import { fade } from '../../styles/helpers/color';
import {
  fontSmoothOff,
  fontSmoothOn,
  stripUl,
} from '../../styles/helpers/extend';

const subNavItems: SubNavItem[] = [
  {
    text: 'Terms',
    url: '/terms',
  },
  {
    text: 'About',
    url: '/about',
  },
  {
    text: 'Contact',
    url: '/contact',
  },
];

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
    },
    containerSubNav: {
      ...fontSmoothOn,
      bottom: 0,
      borderTop: `1px solid ${fade(theme.palette.primary.contrastText, 0.8)}`,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      fontSize: '0.9em',
      justifyContent: 'space-between',
      left: 0,
      padding: theme.spacing(2),
      position: 'absolute',
      right: 0,
      [theme.breakpoints.up('sm')]: {
        ...fontSmoothOff,
        borderColor: theme.palette.divider,
        color: theme.palette.text.disabled,
        fontSize: '0.8em',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '0.9em',
      },
    },
    ulSubNav: {
      ...stripUl,
    },
    liSubNav: {
      display: 'inline-block',
    },
    linkSubNav: {
      color: 'inherit',
      padding: theme.spacing(0.5),
      textDecoration: 'none',
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
      '&:hover': {
        color: theme.palette.highlight.main,
      },
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          color: theme.palette.primary.main,
        },
      },
    },
  })
);

const RegionSidebar = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/region">
        <Logo className={classes.logo} />
      </Link>
      <RegionMenu />

      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <Link href="/region">
            <a className={classes.listItemLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <HomeIcon />
              </ListItemIcon>
              Region Home
            </a>
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Link href="/businesses">
            <a className={classes.listItemLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <WorkIcon />
              </ListItemIcon>
              Businesses
            </a>
          </Link>
        </MenuItem>
      </MenuList>

      <div className={classes.containerSubNav}>
        <ul className={classes.ulSubNav}>
          {
            subNavItems.map(({ text, url }) => (
              <li
                className={classes.liSubNav}
                key={url}
              >
                <Link href={url}>
                  <a className={classes.linkSubNav}>
                    {text}
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
        &copy; 2020 RAnLab
      </div>
    </div>
  );
};

export interface SubNavItem {
  text: string;
  url: string;
}

export default RegionSidebar;
