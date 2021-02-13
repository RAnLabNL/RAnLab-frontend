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
import { useSelector } from  'react-redux';

import Button from '../../base/Button';
import Logo from '../../base/Logo';
import TermsMenu from '../../base/TermsMenu';
import Typography from '../../base/Typography';
import RegionMenu from '../RegionMenu';
import { RootState } from '../../../store';
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
    typographyWarning: {
      marginTop: theme.spacing(1),
      textAlign: 'center',
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
  { name: 'RanLabRegionSidebar' },
);

const RegionSidebar = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const selectedRegion = useSelector((state: RootState) => state.region.selectedRegion);

  const handleDownloadReportClick = () => {
    window.open('/assets/fixture/test-report.pdf');
  };

  return (
    <div className={classes.root}>
      <Link href="/region">
        <Logo className={classes.logo} />
      </Link>
      <div id="main-tour-step-sidebar-region-select">
        <RegionMenu />
      </div>

      {
        selectedRegion
          ? (
            <MenuList className={classes.menuList}>
              <MenuItem className={classes.menuItem}>
                <Link href="/region">
                  <a
                    className={classes.listItemLink}
                    id="main-tour-step-nav-region-home"
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <HomeIcon />
                    </ListItemIcon>
                    {t('region-sidebar-home')}
                  </a>
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <Link href="/businesses">
                  <a
                    className={classes.listItemLink}
                    id="main-tour-step-nav-businesses"
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <WorkIcon />
                    </ListItemIcon>
                    {t('region-sidebar-businesses')}
                  </a>
                </Link>
              </MenuItem>
            </MenuList>
          )
          : (
            <Typography
              className={classes.typographyWarning}
              color="error"
              variant="subtitle2"
            >
              {t('region-sidebar-select-warning')}
            </Typography>
          )
      }

      <div className={classes.containerBottom}>
        {
          selectedRegion
            ? (
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
                  id="main-tour-step-sidebar-report"
                  onClick={handleDownloadReportClick}
                  variant="contained"
                  
                >
                  {t('region-sidebar-download-report')}
                </Button>
              </div>
            )
            : null
        }
        <div className={classes.containerTermsMenu}>
          <TermsMenu isMenu />
        </div>
      </div>
    </div>
  );
};

export default RegionSidebar;
