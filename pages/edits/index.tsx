import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllUsers } from '../../store/actions/user';
import AppLoading from '../../components/base/AppLoading';
import AdminLayout from '../../components/layout/admin-layout/AdminLayout';
import RegionLayout from '../../components/layout/region-layout/RegionLayout';
import AllEditsByStatusTables from '../../components/modules/edits/AllEditsByStatusTables';
import { RootState } from '../../store';

const Edits = (): ReactElement => {
  const { t } = useTranslation('pages');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(
    () => {
      if (
        user
        && (
          !user.allUsers
          || (Object.keys(user.allUsers).length === 0 && user.allUsers.constructor === Object)
        )
      ) {
        dispatch(fetchAllUsers());
      }
    },
    [],
  );

  if (user && user.role === 'admin') {
    return (
      <AdminLayout title={t('edits-title')}>
        <AllEditsByStatusTables />
      </AdminLayout>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <RegionLayout title={t('edits-title')}>
        <AllEditsByStatusTables />
      </RegionLayout>
    );
  }

  return <AppLoading />;
};

export default Edits;
