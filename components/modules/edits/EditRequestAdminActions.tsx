import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Link from 'next/link';

import { Status } from '../../../store/types/businessEdit';
import { darken } from '../../../styles/helpers/color';
import Button from '../../base/Button';

type Props = {
  businessEditId?: string;
  handleActionClick?: (e: MouseEvent) => void;
  handleDownloadClick?: (e: MouseEvent) => void;
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    button: {
      width: '100%',
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.up('lg')]: {
        width: 'auto',
        marginLeft: theme.spacing(0.5),
      },
      '& > span': {
        pointerEvents: 'none',
      },
    },
    buttonDecline: {
      background: theme.palette.error.dark,
      '&:hover': {
        background: darken(theme.palette.error.dark, 0.15),
      },
    },
    buttonAmend:{
      background: darken(theme.palette.amend, 0.2),
      '&:hover': {
        background: darken(theme.palette.amend, 0.3),
      },
    },
    buttonApprove: {
      background: theme.palette.success.main,
      '&:hover': {
        background: theme.palette.success.dark,
      },
    },
  })
);

const EditRequestAdminActions = (props: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const {
    businessEditId,
    handleActionClick,
    handleDownloadClick,
  } = props;

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        startIcon={
          <GetAppIcon />
        }
        variant="outlined"
        onClick={handleDownloadClick}
      >
        {t('edit-request-admin-action-download')}
      </Button>
      <Button
        className={classNames(
          classes.button,
          classes.buttonDecline,
        )}
        startIcon={
          <CloseIcon />
        }
        color="primary"
        variant="contained"
        onClick={handleActionClick}
        data-action={Status.DECLINED}
      >
        {t('edit-request-admin-action-decline')}
      </Button>
      <Link href={`/businesses?amendId=${businessEditId}`}>
        <Button
          className={classNames(
            classes.button,
            classes.buttonAmend
          )}
          component="a"
          startIcon={
            <EditIcon />
          }
          color="primary"
          variant="contained"
        >
          {t('edit-request-admin-action-amend')}
        </Button>
      </Link>
      <Button
        className={classNames(
          classes.button,
          classes.buttonApprove,
        )}
        startIcon={
          <CheckIcon />
        }
        color="primary"
        variant="contained"
        onClick={handleActionClick}
        data-action={Status.APPROVED}
      >
        {t('edit-request-admin-action-approve')}
      </Button>
    </div>
  );
};

export default EditRequestAdminActions;
