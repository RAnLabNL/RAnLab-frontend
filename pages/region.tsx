import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from  'react-redux';

import RegionLayout from '../components/layout/region-layout/RegionLayout';
import DownloadReportCard from '../components/modules/region-home/DownloadReportCard';
import EditBusinessCard from '../components/modules/region-home/EditBusinessCard';
import AppLoading from '../components/base/AppLoading';
import Typography from '../components/base/Typography';
import { RootState } from '../store';
import { setSelectedRegion } from '../store/actions/region';

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
  const regionState = useSelector((state: RootState) => state.region);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (
        regionState.selectedRegion === 'all'
        && regionState.regions
        && regionState.regions.length
      ) {
        dispatch(setSelectedRegion(regionState.regions[0]));
      }
    },
    [regionState]
  );

  return (
    <RegionLayout title={t('region-title')}>
      {
        regionState.loading
          ? (
            <div className={classes.containerLoading}>
              <AppLoading />
            </div>
          )
          : null
      }
      {
        !regionState.loading
        && regionState.selectedRegion
        && regionState.selectedRegion !== 'all'
          ? (
            <>
              <Typography
                className={classes.typographyH1}
                variant="h1"
              >
                <small>{regionState.selectedRegion.name}</small>
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
          : null
      }
      {
        !regionState.loading && regionState.regions && !regionState.regions.length
          ? (
            <>
              <Typography
                className={classes.typographyH1}
                variant="h1"
              >
                {t('region-title-no-regions')}
              </Typography>
              <Typography>
                {t('region-body-no-regions')}
              </Typography>
            </>
          )
          : null
      }
    </RegionLayout>
  );
};

export default Region;
