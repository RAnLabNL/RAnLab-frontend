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

const PRISMIC_INFO_DIALOG_ID = 'download-report-card-learn-more';

const useStyles = makeStyles(
  () => ({
    buttonClose: {
      textTransform: 'uppercase',
    },
  })
);

const DownloadReportLearnMoreDialog = (props: DialogProps): ReactElement => {
  const {
    onClose,
    ...other
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const infoDialog = useSelector((state: RootState) => state.infoDialog);
  const [downloadReportDialog, setDownloadReportDialog] = useState<Document | null>(null);

  // Sets dialog to current state result
  useEffect(
    () => {
      if (infoDialog && infoDialog.dialogs && !infoDialog.loading) {
        setDownloadReportDialog(filterById(PRISMIC_INFO_DIALOG_ID, infoDialog.dialogs));
      }
    },
    [infoDialog],
  );

  // Fetches dialog if not already in state
  useEffect(
    () => {
      if (!downloadReportDialog) {
        dispatch(fetchInfoDialogById(PRISMIC_INFO_DIALOG_ID));
      }
    },
    [downloadReportDialog],
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
        downloadReportDialog
          ? (
            <>
              <DialogContent>
                <RichText render={downloadReportDialog.data.title} />
                <RichText render={downloadReportDialog.data.body} />
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

export default DownloadReportLearnMoreDialog;
