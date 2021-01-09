import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from  'react-redux';

import RegionLayout from '../components/layout/region-layout/RegionLayout';
import DownloadReportCard from '../components/modules/region-home/DownloadReportCard';
import EditBusinessCard from '../components/modules/region-home/EditBusinessCard';
import AppLoading from '../components/base/AppLoading';
import Typography from '../components/base/Typography';
import { RootState } from '../store';

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
    containerLoading: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  { name: 'RanLabRegion' },
);

const Region = (): ReactElement => {
  const { t } = useTranslation('pages');
  const classes = useStyles();
  const selectedRegion = useSelector((state: RootState) => state.region.selectedRegion);

  return (
    <RegionLayout title={t('region-title')}>
      {
        selectedRegion
          ? (
            <>
              <Typography
                className={classes.typographyH1}
                variant="h1"
              >
                <small>{selectedRegion.name}</small>
                {t('region-title')}
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
            </>
          )
          : (
            <div className={classes.containerLoading}>
              <AppLoading />
            </div>
          )
      }
    </RegionLayout>
  );
};

export default Region;
