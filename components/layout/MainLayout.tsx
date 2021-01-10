import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { ReactNode, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import AppLoading from '../base/AppLoading';
import Typography from '../base/Typography';
import ProfileForm from '../modules/profile/ProfileForm';
import ProfileSetupLayout from './ProfileSetupLayout';

const useStyles = makeStyles(
  (theme) => ({
    typographyH1: {
      marginBottom: theme.spacing(3),
      '& > small': {
        color: theme.palette.text.secondary,
        display: 'block',
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: '0.65em',
      },
    },
    containerLoading: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
  { name: 'RanLabMainLayout' }
);

type Props = {
  children?: ReactNode
  title?: string
};

const MainLayout = ({ children, title }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const { t: tCommon } = useTranslation('common');
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user);

  const isProfileEmpty = 
      user.profile
      && user.profile.constructor === Object && Object.keys(user.profile).length === 0;

  const getTitle = () => {
    return (isProfileEmpty)
      ? t('main-layout-profile-setup-title')
      : title;
  };

  const profileRender = (
    <ProfileSetupLayout>
      <Typography
        className={classes.typographyH1}
        variant="h1"
      >
        {t('main-layout-profile-setup-heading')}
      </Typography>
      <Typography>
        {t('main-layout-profile-setup-body')}
      </Typography>
      <ProfileForm />
    </ProfileSetupLayout>
  );

  const renderProfileOrChildren = () => {
    return !user.profile || isProfileEmpty ? profileRender : children;
  };

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>
          {
            getTitle() ? `${getTitle()} | ` : ''
          }
          {tCommon('app-name')}
        </title>
      </Head>
      <div>
        {
          user.loading
            ? (
              <div className={classes.containerLoading}>
                <AppLoading />
              </div>
            )
            : renderProfileOrChildren()
        }
      </div>
    </div>
  );
};

export default MainLayout;
