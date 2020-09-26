import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import BusinessesDataSourcesDialog from '../components/BusinessesDataSourcesDialog';
import BusinessesFilters from '../components/BusinessesFilters';
import Button from '../components/Button';
import DataSources from '../components/DataSourcesButton';
import Typography from '../components/Typography';
import RegionLayout from '../layouts/RegionLayout/RegionLayout';

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    containerNavigation: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: `0 -${theme.spacing(2)}px`,
      padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        margin: `0 -${theme.spacing(3)}px`,
        padding: `0 ${theme.spacing(3)}px ${theme.spacing(2)}px`,
      },
      [theme.breakpoints.up('md')]: {
        margin: `0 -${theme.spacing(4)}px`,
        padding: `0 ${theme.spacing(4)}px ${theme.spacing(3)}px`,
      },
    },
    linkBreadcrumb: {
      fontWeight: theme.typography.fontWeightBold,
      textDecoration: 'none',
    },
    gridContainerFilters: {
      padding: `${theme.spacing(2)}px 0`,
    },
    buttonEdit: {
      marginLeft: theme.spacing(1),
    },
  })
);

const Businesses = (): ReactElement => {
  const { t } = useTranslation('pages');
  const classes = useStyles();
  const [
    dataSourcesDialogOpen,
    setDataSourcesDialogOpen,
  ] = useState(false);

  const handleDataSourcesClick = (e: MouseEvent) => {
    e.preventDefault();
    setDataSourcesDialogOpen(true);
  };

  const handleDataSourcesDialogClose = () => {
    setDataSourcesDialogOpen(false);
  };

  return (
    <RegionLayout title="Edit Businesses">
      <div className={classes.containerNavigation}>
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid item>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={
                <NavigateNextIcon fontSize="small" />
              }
            >
              <Link href="/region">
                <a className={classes.linkBreadcrumb}>
                  St. John&rsquo;s
                </a>
              </Link>
              <Typography>
                {t('businesses-heading')}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Button
              className={classes.buttonEdit}
              color="primary"
              size="small"
              startIcon={
                <EditIcon fontSize="small" />
              }
              variant="contained"
            >
              {t('businesses-edit')}
            </Button>
          </Grid>
        </Grid>
      </div>
      <Grid
        alignItems="center"
        className={classes.gridContainerFilters}
        container
        justify="space-between"
        spacing={2}
      >
        <Grid item>
          <BusinessesFilters />
        </Grid>
        <Grid item>
          <DataSources
            onClick={handleDataSourcesClick}
          />
          <BusinessesDataSourcesDialog
            open={dataSourcesDialogOpen}
            onClose={handleDataSourcesDialogClose}
          />
        </Grid>
      </Grid>
    </RegionLayout>
  );
};

export default Businesses;
