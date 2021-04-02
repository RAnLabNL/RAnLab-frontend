import { useRouter } from 'next/router';
import { ReactElement, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AppLoading from '../../components/base/AppLoading';
import AdminLayout from '../../components/layout/admin-layout/AdminLayout';
import RegionLayout from '../../components/layout/region-layout/RegionLayout';
import EditRequestSingle from '../../components/modules/edits/EditRequestSingle';
import { RootState } from '../../store';
import { BusinessEdit } from '../../store/types/businessEdit';
import { fetchSingleBusinessEdit } from '../../store/actions/businessEdit';

const Request = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation('pages');
  const user = useSelector((state: RootState) => state.user);
  const [businessEdit, setBusinessEdit] = useState<BusinessEdit | undefined>();
  const businessEditState = useSelector((state: RootState) => state.businessEdit);

  useEffect(
    () => {
      fetchEdit(router.asPath);

      const handleRouteChange = (url: string) => {
        fetchEdit(url);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    },
    [],
  );

  useEffect(
    () => {
      if (
        !businessEditState.loading
        && businessEditState.singleBusinessEdit
      ) {
        setBusinessEdit(businessEditState.singleBusinessEdit);
      }
    },
    [businessEditState.loading],
  );

  const fetchEdit = (url: string) => {
    const id = url.split('id=')[1];
    if (id) {
      dispatch(fetchSingleBusinessEdit(id));
    }
  };

  const warnings = (
    <div>
      {
        !router.query.id
          ? 'No id found in URL'
          : null
      }
      {
        !businessEditState.loading && !businessEdit
          ? 'Business edit request not found'
          : null
      }
    </div>
  );

  if (user && user.role === 'admin') {
    return (
      <AdminLayout title={t('edits-title')}>
        {warnings}
        {
          businessEdit
            ? <EditRequestSingle businessEdit={businessEdit} />
            : null
        }
      </AdminLayout>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <RegionLayout title={t('edits-title')}>
        {warnings}
        {
          businessEdit
            ? <EditRequestSingle businessEdit={businessEdit} />
            : null
        }
      </RegionLayout>
    );
  }

  return <AppLoading />;
};

export default Request;
