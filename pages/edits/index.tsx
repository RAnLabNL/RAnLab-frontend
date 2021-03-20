import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AppLoading from '../../components/base/AppLoading';
import AdminLayout from '../../components/layout/admin-layout/AdminLayout';
import RegionLayout from '../../components/layout/region-layout/RegionLayout';
import EditsAdmin from '../../components/modules/edits/EditsAdmin';
import EditsRegion from '../../components/modules/edits/EditsRegion';
import { RootState } from '../../store';

const Edits = (): ReactElement => {
  const { t } = useTranslation('pages');
  const user = useSelector((state: RootState) => state.user);

  if (user && user.role === 'admin') {
    return (
      <AdminLayout title={t('edits-title')}>
        <EditsAdmin />
      </AdminLayout>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <RegionLayout title={t('edits-title')}>
        <EditsRegion />
      </RegionLayout>
    );
  }

  return <AppLoading />;
};

export default Edits;
