import Container from '@material-ui/core/Container';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import RegionLayout from '../layouts/RegionLayout/RegionLayout';
import ProfileForm from '../components/ProfileForm';
import Typography from '../components/Typography';

const Profile = (): ReactElement => {
  const { t } = useTranslation('pages');
  return (
    <RegionLayout title="Edit Profile">
      <Container maxWidth="md">
        <Typography variant="h1">
          {t('profile-edit-heading')}
        </Typography>
        <ProfileForm />
      </Container>
    </RegionLayout>
  );
};

export default Profile;
