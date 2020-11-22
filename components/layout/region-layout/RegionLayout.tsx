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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useViewport } from '../../../providers/viewport';
import { RootState } from '../../../store';
import createShadow from '../../../styles/helpers/createShadow';
import { fade } from '../../../styles/helpers/color';

import AppLoading from '../../base/AppLoading';
import Typography from '../../base/Typography';
import ProfileForm from '../../modules/profile/ProfileForm';
import MainLayout from '../MainLayout';
import ProfileSetupLayout from '../ProfileSetupLayout';
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
    typographyH1: {
      marginBottom: theme.spacing(3),
      '& > small': {
        color: theme.palette.text.secondary,
        display: 'block',
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: '0.65em',
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
      marginTop: '3.5rem',
      overflowY: 'hidden',
      padding: theme.spacing(1.75),
      position: 'relative',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // Localize fixed positioning
      transform: 'translate(0,0)',
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
  }),
  { name: 'RanLabRegionLayout' },
);

const RegionLayout = ({ children, title }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const { width } = useViewport();
  const user = useSelector((state: RootState) => state.user);

  const fixedNavBreakpoint = 600;
  const [open, setOpen] = useState(width >= fixedNavBreakpoint);

  useEffect(() => {
    setOpen(width >= fixedNavBreakpoint);
  }, [width]);

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const isProfileEmpty = 
    user.profile
    && user.profile.constructor === Object && Object.keys(user.profile).length === 0;

  if (!user.profile || isProfileEmpty) {
    if (user.loading) {
      return <AppLoading />;
    }
    else {
      return (
        <ProfileSetupLayout>
          <Typography
            className={classes.typographyH1}
            variant="h1"
          >
            {t('region-layout-profile-setup-heading')}
          </Typography>
          <Typography>
            {t('region-layout-profile-setup-body')}
          </Typography>
          <ProfileForm />
        </ProfileSetupLayout>
      );
    }
  }

  if (user.profile && !isProfileEmpty) {
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
  }

  return <AppLoading />;
};

export default RegionLayout;
