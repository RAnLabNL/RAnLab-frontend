import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import {
  ReactNode,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import { useViewport } from '../../providers/viewport';
import createShadow from '../../styles/helpers/createShadow';
import { fade } from '../../styles/helpers/color';
import MainLayout from '../MainLayout';
import RegionSidebar from './RegionSidebar';
import RegionToolbar from './RegionToolbar';

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
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
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
      boxShadow: createShadow(fade(theme.palette.primary.dark, 0.65), 9),
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
      padding: theme.spacing(1.75),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginTop: '3.5rem',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
        marginLeft: `-${drawerWidthSmEm}em`,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
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
  const classes = useStyles();
  const { width } = useViewport();

  const fixedNavBreakpoint = 600;
  const [open, setOpen] = useState(width >= fixedNavBreakpoint);

  useEffect(() => {
    setOpen(width >= fixedNavBreakpoint);
  }, [width]);

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
          <RegionToolbar
            onMenuButtonClick={toggleDrawerOpen}
          />
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
