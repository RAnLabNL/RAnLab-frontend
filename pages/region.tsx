import { ReactElement } from 'react';

import RegionLayout from '../layouts/RegionLayout';
import Button from '../components/Button';
import Typography from '../components/Typography';

const Dashboard = (): ReactElement => (
  <RegionLayout title="Dashboard">
    <Typography variant="h1">
      Test Region Dashboard
    </Typography>
    <Button>
      Test Button
    </Button>
  </RegionLayout>
);

export default Dashboard;
