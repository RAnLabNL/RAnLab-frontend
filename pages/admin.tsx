// import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import AdminLayout from '../components/layout/admin-layout/AdminLayout';

// const useStyles = makeStyles(
//   () => ({
//     root: {},
//   })
// );

const Admin = (): ReactElement => {
  const { t } = useTranslation('pages');
  // const classes = useStyles();

  return (
    <AdminLayout title={t('admin-title')}>
      Admin Page
    </AdminLayout>
  );
};

export default Admin;
