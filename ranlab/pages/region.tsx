import RegionLayout from '../layouts/RegionLayout';
import Button from '../components/Button';
import Typography from '../components/Typography';

export default function Dashboard() {
  return (
    <RegionLayout title="Dashboard">
      <Typography variant="h1">
        Test Region Dashboard
      </Typography>
      <Button>
        Test Button
      </Button>
    </RegionLayout>
  );
}
