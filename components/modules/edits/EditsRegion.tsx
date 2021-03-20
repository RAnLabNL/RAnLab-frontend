import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '../../base/Typography';
import UpdateRequestTable from './EditRequestsTable';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(1),
    },
    typographyH2: {
      marginBottom: theme.spacing(3),
      textAlign: 'center',
    },
  })
);

const UpdatesRegion = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.typographyH2}
        variant="h2"
      >
        {t('updates-region-heading')}
      </Typography>
      <UpdateRequestTable businessEdits={[]} />
    </div>
  );
};

export default UpdatesRegion;
