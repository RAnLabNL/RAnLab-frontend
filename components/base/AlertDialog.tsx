import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MouseEvent, ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';

type Props = {
  cancelButton?: string;
  confirmButton?: string;
  content: ReactNode;
  onCancel?: (e: MouseEvent) => void;
  onClose: () => void;
  onConfirm: (e: MouseEvent) => void;
  open: DialogProps['open'];
  title: ReactNode;
};

const AlertDialog = (props: Props): ReactElement => {
  const { t } = useTranslation('components');
  const {
    cancelButton = t('alert-dialog-cancel'),
    confirmButton = t('alert-dialog-confirm'),
    content,
    onCancel,
    onClose,
    onConfirm,
    open,
    title,
  } = props;

  const handleCancel = (e: MouseEvent) => {
    if (onCancel) {
      onCancel(e);
    }
    onClose();
  };

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={onClose}
      open={open}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" variant="outlined">
          {cancelButton}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
