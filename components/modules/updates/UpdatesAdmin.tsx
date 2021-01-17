import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import fixtureData from '../../../fixtures/updatesAdmin.json';
import fixtureDataPending from '../../../fixtures/updatesAdminPending.json';
import Typography from '../../base/Typography';
import UpdateRequestTable from './UpdateRequestsTable';


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
  })
);

const UpdatesAdmin = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.containerDataset}>
        <Typography
          className={classes.typographyH2}
          variant="h2"
        >
          {t('updates-admin-heading-pending')}
        </Typography>
        <UpdateRequestTable
          dataSet={fixtureDataPending}
          admin
        />
      </div>

      <div className={classes.containerDataset}>
        <Typography
          className={classes.typographyH2}
          variant="h2"
        >
          {t('updates-admin-heading-reviewed')}
        </Typography>
        <UpdateRequestTable
          dataSet={fixtureData}
          admin
        />
      </div>
    </div>
  );
};

export default UpdatesAdmin;
