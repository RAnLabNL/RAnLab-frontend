import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { fade } from '../../../styles/helpers/color';
import Button from '../../base/Button';
import Tour from '../../base/Tour';

const useStyles = makeStyles(
  (theme) => ({
    button: {
      fontWeight: theme.typography.fontWeightRegular,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    iconButton: {
      border: `1px solid ${fade(theme.palette.primary.main, 0.75)}`,
      marginRight: theme.spacing(1),
      padding: '0.25em',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    containerTour: {
      display: 'inline-block',
    },
  })
);

const RegionWalkthroughButton = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const handleTourButtonClick = () => {
    setIsTourOpen(true);
  };

  const handleTourClose = () => {
    setIsTourOpen(false);
  };

  const [steps] = useState([
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#region-tour-step-1',
      content: 'Select a region by using this dropdown.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#region-tour-step-2',
      content: 'Get an overview of your selected region on your home screen.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#region-tour-step-3',
      content: 'View and request edits for your regions businesses here.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#region-tour-step-4',
      content: 'Download your customized report at any time.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#region-tour-step-5',
      content: 'Edit your personal profile using this menu.',
    },
    {
      disableBeacon: true,
      hideCloseButton: true,
      target: '#region-tour-step-6',
      content: 'Look for this icon on other screens to get more help using the app.',
    },
  ]);

  return (
    <>
      <Button
        className={classes.button}
        color="inverted"
        id="region-tour-step-6"
        onClick={handleTourButtonClick}
        startIcon={
          <FlagIcon fontSize="small" />
        }
        variant="outlined"
      >
        {t('region-walkthrough-button')}
      </Button>
      <IconButton
        aria-label={t('region-walkthrough-button')}
        color="inherit"
        className={classes.iconButton}
        onClick={handleTourButtonClick}
      >
        <FlagIcon fontSize="small" />
      </IconButton>
      <div
        className={classes.containerTour}
      >
        <Tour
          handleClose={handleTourClose}
          open={isTourOpen}
          steps={steps}
        />
      </div>
    </>
  );
};

export default RegionWalkthroughButton;
