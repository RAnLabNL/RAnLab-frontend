import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { Document } from 'prismic-javascript/types/documents';
import { RichText } from 'prismic-reactjs';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { fetchInfoDialogById } from '../../../store/actions/infoDialog';
import { filterById } from '../../../store/helpers/prismic';
import Button from '../../base/Button';

const PRISMIC_INFO_DIALOG_ID = 'edit-businesses-card-learn-more';

const useStyles = makeStyles(
  () => ({
    buttonClose: {
      textTransform: 'uppercase',
    },
  })
);

const EditBusinessLearnMoreDialog = (props: DialogProps): ReactElement => {
  const {
    onClose,
    ...other
  } = props;
  const { t } = useTranslation('common');
  const classes = useStyles();
  const dispatch = useDispatch();
  const infoDialog = useSelector((state: RootState) => state.infoDialog);
  const [editBusinessDialog, setEditBusinessDialog] = useState<Document | null>(null);

  // Sets dialog to current state result
  useEffect(
    () => {
      if (infoDialog && infoDialog.dialogs && !infoDialog.loading) {
        setEditBusinessDialog(filterById(PRISMIC_INFO_DIALOG_ID, infoDialog.dialogs));
      }
    },
    [infoDialog],
  );

  // Fetches dialog if not already in state
  useEffect(
    () => {
      if (!editBusinessDialog) {
        dispatch(fetchInfoDialogById(PRISMIC_INFO_DIALOG_ID));
      }
    },
    [editBusinessDialog],
  );

  const onCloseClick = () => {
    if (typeof onClose !== 'undefined') {
      onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <Dialog
      aria-describedby="edit-business-learn-more-content"
      aria-labelledby="edit-business-learn-more-title"
      onClose={onClose}
      {...other}
    >
      {
        editBusinessDialog
          ? (
            <>
              <DialogContent>
                <RichText render={editBusinessDialog.data.title} />
                <RichText render={editBusinessDialog.data.body} />
              </DialogContent>
              <DialogActions>
                <Button
                  className={classes.buttonClose}
                  color="secondary"
                  onClick={onCloseClick}
                  variant="contained"
                >
                  {t('close-button')}
                </Button>
              </DialogActions>
            </>
          )
          : <CircularProgress />
      }
    </Dialog>
  );
};

export default EditBusinessLearnMoreDialog;
