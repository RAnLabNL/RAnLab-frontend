import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../base/Button';
import Logo from '../../base/Logo';
import RegionMenu from '../RegionMenu';
import { fade } from '../../../styles/helpers/color';
import createShadow from '../../../styles/helpers/createShadow';
import {
  fontSmoothOff,
  fontSmoothOn,
  stripUl,
} from '../../../styles/helpers/extend';

const subNavItems: SubNavItem[] = [
  {
    text: 'region-sidebar-terms',
    url: '/terms',
  },
  {
    text: 'region-sidebar-about',
    url: '/about',
  },
  {
    text: 'region-sidebar-contact',
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
    containerSubNav: {
      ...fontSmoothOn,
      borderTop: `1px solid ${fade(theme.palette.primary.contrastText, 0.8)}`,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      fontSize: '0.9em',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
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
  })
);

const RegionSidebar = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  const handleDownloadReportClick = () => {
    window.open('/assets/fixture/test-report.pdf');
  };

  return (
    <div className={classes.root}>
      <Link href="/region">
        <Logo className={classes.logo} />
      </Link>
      <div id="region-tour-step-1">
        <RegionMenu />
      </div>

      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <Link href="/region">
            <a className={classes.listItemLink} id="region-tour-step-2">
              <ListItemIcon className={classes.listItemIcon}>
                <HomeIcon />
              </ListItemIcon>
              {t('region-sidebar-home')}
            </a>
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Link href="/businesses">
            <a className={classes.listItemLink} id="region-tour-step-3">
              <ListItemIcon className={classes.listItemIcon}>
                <WorkIcon />
              </ListItemIcon>
              {t('region-sidebar-businesses')}
            </a>
          </Link>
        </MenuItem>
      </MenuList>

      <div className={classes.containerBottom}>
        <div className={classes.containerDownloadReport}>
          <Button
            className={classes.buttonDownloadReport}
            component="a"
            color="highlight"
            fullWidth
            endIcon={
              <GetAppIcon
                fontSize="small"
              />
            }
            id="region-tour-step-4"
            onClick={handleDownloadReportClick}
            variant="contained"
            
          >
            {t('region-sidebar-download-report')}
          </Button>
        </div>
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
                      {t(text)}
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
          &copy; 2020 RAnLab
        </div>
      </div>
    </div>
  );
};

export interface SubNavItem {
  text: string;
  url: string;
}

export default RegionSidebar;
