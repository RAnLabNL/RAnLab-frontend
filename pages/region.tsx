import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import RegionLayout from '../layouts/RegionLayout/RegionLayout';
import Button from '../components/Button';
import Typography from '../components/Typography';

const Dashboard = (): ReactElement => {
  const { t } = useTranslation('pages');
  return (
    <RegionLayout title="Dashboard">
      <Typography variant="h1">
        {t('region-heading')}
      </Typography>
      <Button>
        {t('region-test-button')}
      </Button>
    </RegionLayout>
  );
};

export default Dashboard;
