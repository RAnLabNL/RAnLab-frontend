import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { ReactElement } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Button from '../../base/Button';
import { fade } from '../../../styles/helpers/color';

type Props = {
  onRemove?: () => void;
  open: boolean;
  rowCount: number;
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      background: theme.palette.primary.main,
      bottom: 0,
      boxShadow: `0 0 0.75em ${fade(theme.palette.primary.dark, 0.5)}`,
      color: theme.palette.primary.contrastText,
      left: 0,
      marginLeft: -theme.spacing(4),
      opacity: 0,
      padding: theme.spacing(2),
      pointerEvents: 'none',
      position: 'fixed',
      right: 0,
      textAlign: 'center',
      transform: 'translateY(5rem)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
    },
    open: {
      opacity: 1,
      pointerEvents: 'all',
      transform: 'translateY(0)',
    },
    buttonRemove: {
      marginLeft: theme.spacing(1.5),
    },
  })
);

const BusinessesBulkRemoveSnackbar = (props: Props): ReactElement => {
  const {
    onRemove,
    open,
    rowCount,
  } = props;
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <div
      className={classNames(
        classes.root,
        {
          [classes.open]: open,
        }
      )}
    >
      <div>
        <Trans i18nKey="businesses-bulk-remove-body" count={rowCount}>
          <strong>Apply to selected</strong> ({{ rowCount }}):
        </Trans>
        <Button
          className={classes.buttonRemove}
          color="inverted"
          onClick={onRemove}
          variant="outlined"
          size="small"
          startIcon={
            <DeleteIcon fontSize="small" />
          }
        >
          {t('businesses-bulk-remove-button')}
        </Button>
      </div>
    </div>
  );
};

export default BusinessesBulkRemoveSnackbar;
