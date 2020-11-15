import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { fade } from '../../../styles/helpers/color';
import Tour from '../../base/Tour';

type Props = {
  editingEnabled: boolean;
};

const useStyles = makeStyles(
  (theme) => ({
    iconButton: {
      border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
      padding: theme.spacing(0.5),
    },
  }),
  { name: 'RanLabBusinessesTourButton' },
);

const componentName = (props: Props): ReactElement => {
  const {
    editingEnabled,
  } = props;
  const { t } = useTranslation('components');
  const classes = useStyles();

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const handleTourButtonClick = () => {
    setIsTourOpen(true);
  };

  const handleTourClose = () => {
    setIsTourOpen(false);
  };

  const defaultSteps = [
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#business-tour-step-1',
      content: 'Filter businesses by Year, Industry, or search by name.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#business-tour-step-2',
      content: 'Start adding, upating and removing businesses by clicking here.',
    },
  ];

  const editingSteps = [
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#business-tour-editing-step-1',
      content: 'Add businesses by entering your information in the top row. You can update any business by double-clicking the cell. Remove businesses by using the icon on the right, or select multiple and use the bulk remove tool.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#business-tour-editing-step-2',
      content: 'When you are satisfied with your changes, click here to confirm.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#business-tour-editing-step-3',
      content: 'You can cancel editing and any time and reset your changes back to the original data by clicking here.',
    },
  ];

  const [steps, setSteps] = useState(editingEnabled ? editingSteps : defaultSteps);

  useEffect(
    () => {
      setSteps(editingEnabled ? editingSteps : defaultSteps);
    },
    [editingEnabled]
  );

  return (
    <>
      <IconButton
        aria-label={t('businesses-tour-button')}
        className={classes.iconButton}
        color="primary"
        onClick={handleTourButtonClick}
      >
        <FlagIcon fontSize="small" />
      </IconButton>
      <Tour
        disableScrolling={true}
        handleClose={handleTourClose}
        open={isTourOpen}
        steps={steps}
      />
    </>
  );
};

export default componentName;
