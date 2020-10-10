import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import RegionLayout from '../layouts/RegionLayout/RegionLayout';
import DownloadReportCard from '../components/DownloadReportCard';
import EditBusinessCard from '../components/EditBusinessCard';
import Typography from '../components/Typography';

const useStyles = makeStyles(
  (theme) => ({
    typographyH1: {
      marginBottom: theme.spacing(3),
      '& > small': {
        color: theme.palette.text.secondary,
        display: 'block',
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: '0.65em',
      },
    },
  })
);

const Region = (): ReactElement => {
  const { t } = useTranslation('pages');
  const classes = useStyles();

  return (
    <RegionLayout title="Region Dashboard">
      <Typography
        className={classes.typographyH1}
        variant="h1"
      >
        <small>St. John&rsquo;s, NL</small>
        {t('region-heading')}
      </Typography>

      <Grid
        alignItems="stretch"
        container
        spacing={3}
      >
        <Grid item sm={12} md={12} lg={7}>
          <EditBusinessCard />
        </Grid>
        <Grid item sm={12} md={12} lg={5}>
          <DownloadReportCard />
        </Grid>
      </Grid>
    </RegionLayout>
  );
};

export default Region;
