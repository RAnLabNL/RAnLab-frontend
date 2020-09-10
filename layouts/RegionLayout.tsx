import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactNode, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import MainLayout from './MainLayout';

type Props = {
  children?: ReactNode
  title?: string
};

const drawerWidthEm = 18;

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidthEm}em)`,
      marginLeft: `${drawerWidthEm}em`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: `${drawerWidthEm}em`,
      flexShrink: 0,
    },
    drawerPaper: {
      width: `${drawerWidthEm}em`,
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
      margin: `3rem 0 0 -${drawerWidthEm}em`,
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
              aria-label="Toggle Menu"
              onClick={toggleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
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
          {t('navigation-title')}
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
