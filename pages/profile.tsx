import Container from '@material-ui/core/Container';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AdminLayout from '../components/layout/admin-layout/AdminLayout';
import RegionLayout from '../components/layout/region-layout/RegionLayout';
import ProfileForm from '../components/modules/profile/ProfileForm';
import AppLoading from '../components/base/AppLoading';
import Typography from '../components/base/Typography';
import { RootState } from '../store';

const Profile = (): ReactElement => {
  const { t } = useTranslation('pages');
  const user = useSelector((state: RootState) => state.user);

  const profileRender = (
    <Container maxWidth="md">
      <Typography variant="h1">
        {t('profile-title')}
      </Typography>
      <ProfileForm />
    </Container>
  );

  if (user && user.role === 'admin') {
    return (
      <AdminLayout title={t('profile-title')}>
        {profileRender}
      </AdminLayout>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <RegionLayout title={t('profile-title')}>
        {profileRender}
      </RegionLayout>
    );
  }

  return <AppLoading />;
};

export default Profile;
