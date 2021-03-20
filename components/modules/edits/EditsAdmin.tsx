import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from  'react-redux';

import { RootState } from '../../../store';
import { fetchAllBusinessEdits } from '../../../store/actions/businessEdit';
import { Status } from '../../../store/types/businessEdit';
import Typography from '../../base/Typography';
import EditRequestsTable from './EditRequestsTable';
import AppLoading from '../../base/AppLoading';

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    containerDataset: {
      margin: `${theme.spacing(3)}px 0 ${theme.spacing(6)}px`,
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
    typographyH2: {
      marginBottom: theme.spacing(3),
      textAlign: 'center',
    },
    typographyEmpty: {
      marginBottom: theme.spacing(5),
    },
  })
);

const UpdatesAdmin = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation('components');
  const classes = useStyles();
  const businessEditState = useSelector((state: RootState) => state.businessEdit);

  useEffect(
    () => {
      if (
        businessEditState
        && !businessEditState.loading
        && !businessEditState.fetched
      ) {
        dispatch(fetchAllBusinessEdits());
      }
    },
    [],
  );

  const renderEditsTable = (status: Status) => {
    const render = [
      <Typography
        className={classes.typographyH2}
        key="intro"
        variant="h2"
      >
        {t(`edits-admin-heading-${status.toLowerCase()}`)}
      </Typography>,
    ];

    if (
      !businessEditState.loading
        && businessEditState.businessEdits
        && businessEditState.businessEdits[status]
        && !businessEditState.businessEdits[status].length
    ) {
      render.push(
        <Typography
          className={classes.typographyEmpty}
          align="center"
        >
          {t('edits-admin-no-requests')}
        </Typography>
      );
    }

    if (
      !businessEditState.loading
        && businessEditState.businessEdits
        && businessEditState.businessEdits[status]
        && businessEditState.businessEdits[status].length
    ) {
      render.push(
        <div className={classes.containerDataset}>
          <EditRequestsTable
            businessEdits={businessEditState.businessEdits[status]}
            admin
          />
        </div>
      );
    }

    return render;
  };

  return (
    <div className={classes.root}>
      {
        businessEditState.loading
          ? <AppLoading />
          : (
            <>
              {renderEditsTable(Status.PENDING)}
              {renderEditsTable(Status.APPROVED)}
              {renderEditsTable(Status.AMENDED)}
              {renderEditsTable(Status.DECLINED)}
            </>
          )
      }
      
    </div>
  );
};

export default UpdatesAdmin;
