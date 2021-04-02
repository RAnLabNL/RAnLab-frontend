import classNames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
import {
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from  'react-redux';

import BusinessesDataSourcesDialog from '../components/modules/businesses/BusinessesDataSourcesDialog';
import BusinessesFilters from '../components/modules/businesses/BusinessesFilters';
import BusinessesTable from '../components/modules/businesses/BusinessesTable';
import AppLoading from '../components/base/AppLoading';
import BusinessEditRequestTable from '../components/base/BusinessEditRequestTable';
import Button from '../components/base/Button';
import DataSources from '../components/base/DataSourcesButton';
import Typography from '../components/base/Typography';
import RegionLayout from '../components/layout/region-layout/RegionLayout';
import AlertDialog from '../components/base/AlertDialog';
import BusinessesSaveSuccess from '../components/modules/businesses/BusinessesSaveSuccess';
import BusinessesTourButton from '../components/modules/businesses/BusinessesTourButton';
import { RootState } from '../store';
import { addBusinessEdit } from '../store/actions/businessEdit';
import { fetchBusinessesByRegionId } from '../store/actions/business';
import { fetchSingleBusinessEdit } from '../store/actions/businessEdit';
import { BusinessEditTransactions, BusinessEdit } from '../store/types/businessEdit';

const useStyles = makeStyles(
  (theme) => {
    const getCalculatedHeight = (spacing: number): string => {
      return `calc(100vh - 3.5rem - ${theme.spacing(spacing) * 2}px)`;
    };

    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
      tableVisible: {
        height: getCalculatedHeight(2),
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
      containerSaveSuccess: {
        margin: `${theme.spacing(4)}px auto`,
        maxWidth: '45rem',
      },
      gridContainerFilters: {
        padding: `${theme.spacing(2)}px 0`,
      },
      buttonEdit: {
        marginLeft: theme.spacing(1),
      },
      typographyEmpty: {
        marginTop: theme.spacing(1),
      },
    };
  },
  { name: 'RanLabBusinesses' },
);

const Businesses = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation('pages');
  const classes = useStyles();
  const router = useRouter();

  const selectedRegion = useSelector((state: RootState) => state.region.selectedRegion);
  const businessState = useSelector((state: RootState) => state.business);
  const businessEditState = useSelector((state: RootState) => state.businessEdit);

  const [amendId, setAmendId] = useState<string | undefined>();
  const [businessEdit, setBusinessEdit] = useState<BusinessEdit | undefined>();

  useEffect(
    () => {
      if (router.query.amendId && !Array.isArray(router.query.amendId)) {
        setAmendId(router.query.amendId);
        dispatch(fetchSingleBusinessEdit(router.query.amendId));
      }
    },
    [],
  );

  useEffect(
    () => {
      if (
        !businessEditState.loading
        && businessEditState.singleBusinessEdit
        && router.query.amendId
      ) {
        setBusinessEdit(businessEditState.singleBusinessEdit);
        setTransactions({
          adds: businessEditState.singleBusinessEdit.adds,
          updates: businessEditState.singleBusinessEdit.updates,
          deletes: businessEditState.singleBusinessEdit.deletes,
        });
        dispatch(fetchBusinessesByRegionId(businessEditState.singleBusinessEdit.regionId));
      }
    },
    [businessEditState.singleBusinessEdit],
  );

  useEffect(
    () => {
      if (
        !businessState.businesses
        || (
          selectedRegion
          && selectedRegion !== 'all'
          && !businessState.businesses[selectedRegion.id]
        )
      ) {
        if (selectedRegion && selectedRegion !== 'all') {
          dispatch(fetchBusinessesByRegionId(selectedRegion.id));
        }
      }
    },
    [selectedRegion]
  );

  const getRegionId = (): string => {
    let regionId = '';

    if (selectedRegion === 'all' && businessEditState.singleBusinessEdit) {
      regionId = businessEditState.singleBusinessEdit.regionId;
    }
    if (selectedRegion !== 'all' && selectedRegion) {
      regionId = selectedRegion.id;
    }

    return regionId;
  };

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
  const [
    leaveEditsAlertOpen,
    setLeaveEditsAlertOpen,
  ] = useState<boolean>(false);

  const handleEditBusinesses = () => {
    setBusinessEditingEnabled(!businessEditingEnabled);
  };

  const handleCancelBusinessEdits = () => {
    setLeaveEditsAlertOpen(true);
  };

  const handleLeaveEditsAlertClose = () => {
    setLeaveEditsAlertOpen(false);
  };

  const handleLeaveEditsAlertConfirm = () => {
    setBusinessEditingEnabled(false);
    setLeaveEditsAlertOpen(false);
  };

  // Transaction Record

  const [transactions, setTransactions] = useState<BusinessEditTransactions>({
    adds: [],
    deletes: [],
    updates: [],
  });

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleSaveBusinesses = () => {
    setShowConfirmation(true);
  };

  const handleCancelBusinessConfirmation = () => {
    setShowConfirmation(false);
  };

  const getSaveDisabled = (): boolean => {
    return (
      !transactions.adds.length
      && !transactions.deletes.length
      && !transactions.updates.length
    );
  };

  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleConfirmBusinessUpdates = () => {
    dispatch(addBusinessEdit({ ...transactions }));
  };

  const handleSaveSuccessBack = () => {
    setBusinessEditingEnabled(false);
    setShowSuccess(false);
  };

  useEffect(
    () => {
      console.log(transactions);
    },
    [transactions]
  );

  useEffect(
    () => {
      if (showConfirmation && !businessEditState.loading) {
        if (businessEditState.error) {
          setErrorSnackbarOpen(true);
        }
        else {
          setShowConfirmation(false);
          setShowSuccess(true);
          setErrorSnackbarOpen(false);
        }
      }
    },
    [businessEditState]
  );

  // Error Handling

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <RegionLayout title={t('businesses-title')}>
      <div
        className={classNames(
          classes.root,
          {
            [classes.tableVisible]: !showConfirmation,
          }
        )}
      >
        <div className={classes.containerNavigation}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
          >
            <Grid item>
              {
                amendId
                  ? (
                    <Typography>
                      Amend Business Edit Request
                    </Typography>
                  )
                  : (
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      separator={
                        <NavigateNextIcon fontSize="small" />
                      }
                    >
                      <Link href="/region">
                        <a className={classes.linkBreadcrumb}>
                          {selectedRegion && selectedRegion !== 'all' && selectedRegion.name}
                        </a>
                      </Link>
                      <Typography>
                        {t('businesses-heading')}
                      </Typography>
                    </Breadcrumbs>
                  )
              }
            </Grid>
            {
              showSuccess
                ? null
                : (
                  <Grid item>
                    <Grid
                      alignItems="center"
                      container
                    >
                      <Grid item>
                        {
                          !showConfirmation && !showSuccess
                            ? (
                              <BusinessesTourButton
                                editingEnabled={businessEditingEnabled}
                              />
                            )
                            : null
                        }
                      </Grid>
                      <Grid item>
                        {
                          !businessEditingEnabled
                            ? (
                              <Button
                                className={classes.buttonEdit}
                                color={'primary'}
                                id="businesses-tour-step-edit"
                                onClick={handleEditBusinesses}
                                size="small"
                                startIcon={<EditIcon fontSize="small" />}
                                variant="contained"
                              >
                                {t('businesses-edit')}
                              </Button>
                            )
                            : null
                        }
                        {
                          businessEditingEnabled && !showConfirmation
                            ? (
                              <>
                                <Button
                                  className={classes.buttonEdit}
                                  id="businesses-tour-step-cancel-edits"
                                  onClick={handleCancelBusinessEdits}
                                  size="small"
                                  startIcon={
                                    <CloseIcon fontSize="small" />
                                  }
                                  variant="outlined"
                                >
                                  {t('businesses-edit-cancel')}
                                </Button>
                                <Button
                                  className={classes.buttonEdit}
                                  color={'highlight'}
                                  disabled={getSaveDisabled()}
                                  id="businesses-tour-step-confirm-changes"
                                  onClick={handleSaveBusinesses}
                                  size="small"
                                  startIcon={<SaveIcon fontSize="small" />}
                                  variant="contained"
                                >
                                  {t('businesses-edit-save')}
                                </Button>
                              </>
                            )
                            : null
                        }
                        {
                          showConfirmation
                            ? (
                              <>
                                <Button
                                  onClick={handleCancelBusinessConfirmation}
                                  size="small"
                                  startIcon={
                                    <KeyboardBackspaceIcon fontSize="small" />
                                  }
                                  variant="outlined"
                                >
                                  {t('businesses-confirm-back')}
                                </Button>
                                <Button
                                  className={classes.buttonEdit}
                                  color={'highlight'}
                                  onClick={handleConfirmBusinessUpdates}
                                  size="small"
                                  startIcon={<CheckIcon fontSize="small" />}
                                  variant="contained"
                                >
                                  {t('businesses-confirm-save')}
                                </Button>
                              </>
                            )
                            : null
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                )
            }
          </Grid>
        </div>

        {
          showSuccess
            ? (
              <div className={classes.containerSaveSuccess}>
                <BusinessesSaveSuccess
                  handleBack={handleSaveSuccessBack}
                />
              </div>
            )
            : (
              <Grid
                alignItems="flex-end"
                className={classes.gridContainerFilters}
                container
                justify="space-between"
                spacing={2}
              >
                <Grid item>
                  {
                    showConfirmation
                      ? (
                        <>
                          <Typography variant="h3" component="h2" gutterBottom>
                            {t('businesses-confirm-heading')}
                          </Typography>
                          <Typography>
                            {t('businesses-confirm-body')}
                          </Typography>
                        </>
                      )
                      : (
                        <BusinessesFilters
                          industries={
                            businessState.businesses
                            && businessState.businesses[getRegionId()]
                            && businessState.businesses[getRegionId()].filters
                              ? businessState.businesses[getRegionId()].filters.industries
                              : []
                          }
                          setBusinessIndustryFilter={setBusinessIndustryFilter}
                          setBusinessNameFilter={setBusinessNameFilter}
                          setBusinessYearFilter={setBusinessYearFilter}
                          years={
                            businessState.businesses
                            && businessState.businesses[getRegionId()]
                            && businessState.businesses[getRegionId()].filters
                              ? businessState.businesses[getRegionId()].filters.years
                              : []
                          }
                        />
                      )
                  }
                </Grid>
                <Grid item>
                  {
                    !showConfirmation
                      ? (
                        <>
                          <DataSources
                            onClick={handleDataSourcesClick}
                          />
                          <BusinessesDataSourcesDialog
                            open={dataSourcesDialogOpen}
                            onClose={handleDataSourcesDialogClose}
                          />
                        </>
                      )
                      : null
                  }
                  
                </Grid>
              </Grid>
            )
        }
        {
          businessState.loading
            ? <AppLoading />
            : null
        }
        {
          businessState
          && !businessState.loading
          && businessState.businesses
          && businessState.businesses[getRegionId()]
          && businessState.businesses[getRegionId()].businesses
          && businessState.businesses[getRegionId()].businesses.length
            ? (
              <BusinessesTable
                businesses={businessState.businesses[getRegionId()].businesses}
                editingEnabled={businessEditingEnabled}
                industryFilter={businessIndustryFilter}
                nameFilter={businessNameFilter}
                saving={showConfirmation || showSuccess}
                setTransactions={setTransactions}
                transactions={transactions}
                yearFilter={businessYearFilter}
              />
            )
            : null
        }
        {
          businessState
          && !businessState.loading
          && businessState.businesses
          && businessState.businesses[getRegionId()]
          && (
            !businessState.businesses[getRegionId()].businesses
            || !businessState.businesses[getRegionId()].businesses.length
          )
            ? (
              <Typography className={classes.typographyEmpty}>
                {t('businesses-empty-table')}
              </Typography>
            )
            : null
        }
        <AlertDialog
          content={t('businesses-leave-edits-content')}
          onClose={handleLeaveEditsAlertClose}
          onConfirm={handleLeaveEditsAlertConfirm}
          open={leaveEditsAlertOpen}
          title={t('businesses-leave-edits-title')}
        />
        {
          showConfirmation
            ? (
              <BusinessEditRequestTable
                transactions={transactions}
              />
            )
            : null
        }
      </div>
      <Snackbar
        autoHideDuration={3000}
        open={errorSnackbarOpen}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          onClose={handleErrorSnackbarClose}
          severity="error"
          variant="filled"
        >
          {t('businesses-error-confirm')}
        </Alert>
      </Snackbar>
    </RegionLayout>
  );
};

export default Businesses;
