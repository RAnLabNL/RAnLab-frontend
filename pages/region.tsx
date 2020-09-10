import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import RegionLayout from '../layouts/RegionLayout';
import Button from '../components/Button';
import Typography from '../components/Typography';

const Dashboard = (): ReactElement => {
  const { t } = useTranslation('page-region');
  return (
    <RegionLayout title="Dashboard">
      <Typography variant="h1">
        {t('heading')}
      </Typography>
      <Button>
        {t('test-button')}
      </Button>
    </RegionLayout>
  );
};

export default Dashboard;
