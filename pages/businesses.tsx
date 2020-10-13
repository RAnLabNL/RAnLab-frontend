import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import BusinessesDataSourcesDialog from '../components/modules/businesses/BusinessesDataSourcesDialog';
import BusinessesFilters from '../components/modules/businesses/BusinessesFilters';
import BusinessesTable from '../components/modules/businesses/BusinessesTable';
import Button from '../components/base/Button';
import DataSources from '../components/base/DataSourcesButton';
import Typography from '../components/base/Typography';
import RegionLayout from '../components/layout/region-layout/RegionLayout';

const useStyles = makeStyles(
  (theme) => {
    const getCalculatedHeight = (spacing: number): string => {
      return `calc(100vh - 3.5rem - ${theme.spacing(spacing) * 2}px)`;
    };

    return {
      root: {
        display: 'flex',
        height: getCalculatedHeight(2),
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
          height: getCalculatedHeight(3),
        },
        [theme.breakpoints.up('md')]: {
          height: getCalculatedHeight(4),
        },
      },
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
    };
  }
);

const Businesses = (): ReactElement => {
  const { t } = useTranslation('pages');
  const classes = useStyles();

  // Data Sources Dialog

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

  // Businesses Filters

  const [
    businessIndustryFilter,
    setBusinessIndustryFilter,
  ] = useState<string | null>();

  const [
    businessNameFilter,
    setBusinessNameFilter,
  ] = useState<string | null>();

  const [
    businessYearFilter,
    setBusinessYearFilter,
  ] = useState<number | null>();

  // Business Editing

  const [
    businessEditingEnabled,
    setBusinessEditingEnabled,
  ] = useState<boolean>(false);

  const handleEditBusinesses = () => {
    setBusinessEditingEnabled(!businessEditingEnabled);
  };

  const handleCancelBusinessEdits = () => {
    setBusinessEditingEnabled(false);
  };

  return (
    <RegionLayout title="Edit Businesses">
      <div className={classes.root}>
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
              {
                businessEditingEnabled
                  ? (
                    <Button
                      onClick={handleCancelBusinessEdits}
                      size="small"
                      startIcon={
                        <CloseIcon fontSize="small" />
                      }
                      variant="outlined"
                    >
                      {t('businesses-edit-cancel')}
                    </Button>
                  )
                  : null
              }
              <Button
                className={classes.buttonEdit}
                color={businessEditingEnabled ? 'highlight' : 'primary'}
                onClick={handleEditBusinesses}
                size="small"
                startIcon={
                  businessEditingEnabled
                    ? <SaveIcon fontSize="small" />
                    : <EditIcon fontSize="small" />
                }
                variant="contained"
              >
                {
                  businessEditingEnabled
                    ? t('businesses-edit-save')
                    : t('businesses-edit')
                }
              </Button>
            </Grid>
          </Grid>
        </div>
        <Grid
          alignItems="flex-end"
          className={classes.gridContainerFilters}
          container
          justify="space-between"
          spacing={2}
        >
          <Grid item>
            <BusinessesFilters
              setBusinessIndustryFilter={setBusinessIndustryFilter}
              setBusinessNameFilter={setBusinessNameFilter}
              setBusinessYearFilter={setBusinessYearFilter}
            />
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

        <BusinessesTable
          editingEnabled={businessEditingEnabled}
          industryFilter={businessIndustryFilter}
          nameFilter={businessNameFilter}
          yearFilter={businessYearFilter}
        />
      </div>
    </RegionLayout>
  );
};

export default Businesses;
