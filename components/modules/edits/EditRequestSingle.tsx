import classNames from 'classnames';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import Link from 'next/link';
import { ReactElement, useEffect, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { fetchRegions } from '../../../store/actions/region';
import { fetchUserById } from '../../../store/actions/user';
import { getRegionNameById } from '../../../store/helpers/region';
import { BusinessEdit, Status } from '../../../store/types/businessEdit';
import { fade } from '../../../styles/helpers/color';
import createShadow from '../../../styles/helpers/createShadow';
import Typography from '../../base/Typography';
import BusinessEditRequestTable from '../../base/BusinessEditRequestTable';
import EditRequestAdminActions from './EditRequestAdminActions';
import { setBusinessEditStatus } from '../../../store/actions/businessEdit';
import AlertDialog from '../../base/AlertDialog';
import AppLoading from '../../base/AppLoading';

const DATE_FORMAT = 'MMM D, YYYY h:mmA';

type Props = {
  businessEdit: BusinessEdit,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    linkBack: {
      textDecoration: 'none',
      display: 'block',
      background: theme.palette.background.paper,
      padding: theme.spacing(2),
      boxShadow: createShadow(fade(theme.palette.primary.dark, 0.5), 4),
      margin: `
        -${theme.spacing(1.75)}px
        -${theme.spacing(1.75)}px
        ${theme.spacing(1.75)}px
        -${theme.spacing(1.75)}px
      `,
      [theme.breakpoints.up('sm')]: {
        margin: `
          -${theme.spacing(2)}px
          -${theme.spacing(3)}px
          ${theme.spacing(2)}px
          -${theme.spacing(3)}px
        `,
      },
      [theme.breakpoints.up('md')]: {
        margin: `
          -${theme.spacing(3)}px
          -${theme.spacing(4)}px
          ${theme.spacing(3)}px
          -${theme.spacing(4)}px
        `,
      },
    },
    iconLinkBack: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(1),
    },
    gridContainer: {
      marginBottom: theme.spacing(2),
    },
    typographyInfo: {
      marginBottom: theme.spacing(2),
    },
    gridItemActions: {
      [theme.breakpoints.up('lg')]: {
        textAlign: 'right',
      },
    },
    actionsContainer: {},
    actionsContainerDisabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  })
);

const EditRequestAdmin = ({ businessEdit }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation('components');
  const classes = useStyles();
  const regionState = useSelector((state: RootState) => state.region);
  const [regionName, setRegionName] = useState<string>('');
  const userState = useSelector((state: RootState) => state.user);
  const [submitterName, setSubmitterName] = useState<string>('');
  const [actionsLoading, setActionsLoading] = useState<boolean>(false);
  const businessEditState = useSelector((state: RootState) => state.businessEdit);
  const [actionDialogOpen, setActionDialogOpen] = useState<boolean>(false);
  const [actionStatus, setActionStatus] = useState<Status | null>(null);

  useEffect(
    () => {
      if (!regionState.loading && regionState.regions && !regionState.regions.length) {
        dispatch(fetchRegions());
      }
      setRegionNameFromEdit();
    },
    [regionState],
  );

  useEffect(
    () => {
      if (!userState.loading && userState.allUsers && !userState.allUsers[businessEdit.submitter]) {
        dispatch(fetchUserById(businessEdit.submitter));
      }
      setSubmitterNameFromEdit();
    },
    [userState]
  );

  useEffect(
    () => {
      if (actionsLoading && !businessEditState.loading) {
        setActionsLoading(false);
      }
    },
    [businessEditState],
  );

  useEffect(
    () => {
      setRegionNameFromEdit();
      setSubmitterNameFromEdit();
    },
    [businessEdit]
  );

  const setRegionNameFromEdit = () => {
    if (!regionState.loading && regionState.regions && regionState.regions.length) {
      setRegionName(getRegionNameById(businessEdit.regionId, regionState.regions));
    }
  };

  const setSubmitterNameFromEdit = () => {
    if (!userState.loading && userState.allUsers && userState.allUsers[businessEdit.submitter]) {
      const profile = userState.allUsers[businessEdit.submitter];
      setSubmitterName(`${profile.firstName} ${profile.lastName}`);
    }
  };

  /**
   * Handles action button click
   */
  const handleActionClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const newStatus: Status = target.dataset.action as Status;

    setActionDialogOpen(true);
    setActionStatus(newStatus);
    setActionsLoading(true);
  };

  const confirmAction = () => {
    if (businessEdit.id && businessEdit.status && actionStatus) {
      dispatch(setBusinessEditStatus(businessEdit.id, businessEdit.status, actionStatus));
      setActionStatus(null);
      setActionDialogOpen(false);
    }
  };

  const cancelAction = () => {
    setActionStatus(null);
    setActionDialogOpen(false);
  };

  if (businessEditState && businessEditState.loading) {
    return <AppLoading />;
  }

  return (
    <div className={classes.root}>
      <Link href="/edits">
        <a className={classes.linkBack}>
          <BackIcon className={classes.iconLinkBack} fontSize="small" />
          {t('edit-request-admin-back')}
        </a>
      </Link>

      <Grid
        className={classes.gridContainer}
        container
        justify="space-between"
      >
        <Grid item md={9} lg={5}>
          <Typography variant="h1">
            {t('edit-request-admin-title')}
          </Typography>

          <Typography className={classes.typographyInfo}>
            {t('business-update-request-heading-region')}:
            &nbsp;
            <strong>
              {regionName}
            </strong>
            <br />
            {t('business-update-request-heading-submitted-by')}:
            &nbsp;
            <strong>
              {submitterName}
            </strong>
            <br />
            {t('business-update-request-heading-date-submitted')}:
            &nbsp;
            <strong>
              {moment(businessEdit.dateSubmitted).format(DATE_FORMAT)}
            </strong>
            <br />
            {t('business-update-request-heading-review-status')}:
            &nbsp;
            <strong>
              {businessEdit.status}
            </strong>
          </Typography>
        </Grid>
        <Grid
          className={classes.gridItemActions}
          item
          md={3}
          lg={7}
        >
          {
            businessEdit.status === Status.PENDING
            && userState.role === 'admin'
              ? (
                <div
                  className={classNames(
                    classes.actionsContainer,
                    {
                      [classes.actionsContainerDisabled]: actionsLoading,
                    },
                  )}
                >
                  <EditRequestAdminActions
                    businessEditId={businessEdit.id}
                    handleActionClick={handleActionClick}
                  />
                </div>
              )
              : null
          }
        </Grid>
      </Grid>

      <BusinessEditRequestTable
        transactions={{
          adds: businessEdit.adds,
          updates: businessEdit.updates,
          deletes: businessEdit.deletes,
        }}
      />

      <AlertDialog
        onClose={cancelAction}
        onCancel={cancelAction}
        onConfirm={confirmAction}
        title={
          actionStatus
            ? t(`business-update-request-action-heading-${actionStatus.toLowerCase()}`)
            : null
        }
        content="Are you sure you want to update this edit request? The action cannot be undone."
        open={actionDialogOpen}
      />
    </div>
  );
};

export default EditRequestAdmin;
