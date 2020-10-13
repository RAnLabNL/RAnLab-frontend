import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';

import Button from '../../base/Button';

// const useStyles = makeStyles(
//   () => ({
//     root: {},
//   })
// );

const DownloadReportLearnMoreDialog = (props: DialogProps): ReactElement => {
  const {
    onClose,
    ...other
  } = props;
  // const classes = useStyles();

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
      <DialogTitle>
        {/* This data will be fed in from Prismic, no need for translations */}
        About Your Report
      </DialogTitle>
      <DialogContent>
        Lorem ipsum dolor sit amet
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={onCloseClick}
          variant="contained"
        >
          OK, Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadReportLearnMoreDialog;
