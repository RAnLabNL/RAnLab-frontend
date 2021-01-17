import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AppLoading from '../components/base/AppLoading';
import AdminLayout from '../components/layout/admin-layout/AdminLayout';
import RegionLayout from '../components/layout/region-layout/RegionLayout';
import UpdatesAdmin from '../components/modules/updates/UpdatesAdmin';
import UpdatesRegion from '../components/modules/updates/UpdatesRegion';
import { RootState } from '../store';

const Updates = (): ReactElement => {
  const { t } = useTranslation('pages');
  const user = useSelector((state: RootState) => state.user);

  if (user && user.role === 'admin') {
    return (
      <AdminLayout title={t('updates-title')}>
        <UpdatesAdmin />
      </AdminLayout>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <RegionLayout title={t('updates-title')}>
        <UpdatesRegion />
      </RegionLayout>
    );
  }

  return <AppLoading />;
};

export default Updates;
