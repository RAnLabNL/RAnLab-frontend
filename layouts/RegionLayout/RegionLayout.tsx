import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import { ReactNode, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../../components/Logo';
import MainLayout from '../MainLayout';
import RegionSidebar from './RegionSidebar';

type Props = {
  children?: ReactNode
  title?: string
};

const drawerWidthSmEm = 18;
const drawerWidthMdEm = 22;

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down('xs')]: {
        zIndex: 1300,
        background: theme.palette.background.paper,
        color: theme.palette.primary.dark,
      },
    },
    appBarShift: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidthSmEm}em)`,
        marginLeft: `${drawerWidthSmEm}em`,
      },
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidthMdEm}em)`,
        marginLeft: `${drawerWidthMdEm}em`,
      },
    },
    logoContainer: {
      width: '5rem',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawer: {
      width: '100vw',
      flexShrink: 0,
      [theme.breakpoints.up('sm')]: {
        width: `${drawerWidthSmEm}em`,
      },
      [theme.breakpoints.up('md')]: {
        width: `${drawerWidthMdEm}em`,
      },
    },
    drawerPaper: {
      width: '100vw',
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.up('sm')]: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        width: `${drawerWidthSmEm}em`,
      },
      [theme.breakpoints.up('md')]: {
        width: `${drawerWidthMdEm}em`,
      },
    },
    drawerPaperAnchorDockedLeft: {
      borderRightWidth: 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginTop: '3rem',
      [theme.breakpoints.up('sm')]: {
        marginLeft: `-${drawerWidthSmEm}em`,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: `-${drawerWidthMdEm}em`,
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const RegionLayout = ({ children, title }: Props): ReactElement => {
  const { t } = useTranslation('layout-region');
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <MainLayout title={title}>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(
            classes.appBar,
            {
              [classes.appBarShift]: open,
            },
          )}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label={t('navigation-title')}
              onClick={toggleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.logoContainer}>
              <Link href="/region">
                <Logo variant="standalone" />
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.drawerPaperAnchorDockedLeft,
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <RegionSidebar />
        </Drawer>
        <main
          className={classNames(
            classes.content,
            {
              [classes.contentShift]: open,
            },
          )}
        >
          {children}
        </main>
      </div>
    </MainLayout>
  );
};

export default RegionLayout;