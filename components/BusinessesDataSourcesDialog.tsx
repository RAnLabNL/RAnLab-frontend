import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';

import Button from './Button';

// const useStyles = makeStyles(
//   () => ({
//     root: {},
//   })
// );

// type Props = {
//   onClose?: DialogProps['onClose'];
//   open?: DialogProps['open'];
// };

const BusinessesDataSourcesDialog = (props: DialogProps): ReactElement => {
  const {
    onClose,
    open,
  } = props;

  const onCloseClick = () => {
    if (typeof onClose !== 'undefined') {
      onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <Dialog
      aria-describedby="businesses-data-source-content"
      aria-labelledby="businesses-data-source-title"
      onClose={onClose}
      open={open}
      // open={open === undefined ? false : open}
    >
      <DialogTitle>
        {/* This data will be fed in from Prismic, no need for translations */}
        Businesses Data Sources
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

export default BusinessesDataSourcesDialog;
