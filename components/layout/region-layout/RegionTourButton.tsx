import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import { Document } from 'prismic-javascript/types/documents';
import { RichText } from 'prismic-reactjs';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Step } from 'react-joyride';
import { useDispatch, useSelector } from  'react-redux';

import { RootState } from '../../../store';
import { fetchTourById } from '../../../store/actions/tour';
import { filterById } from '../../../store/helpers/prismic';
import { TourStep } from '../../../store/types/tour';
import { fade } from '../../../styles/helpers/color';
import Button from '../../base/Button';
import Tour from '../../base/Tour';

const PRISMIC_TOUR_ID = 'main-tour';

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
  }),
  { name: 'RanLabRegionTourButton' },
);

const RegionWalkthroughButton = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const dispatch = useDispatch();

  const tour = useSelector((state: RootState) => state.tour);
  const [mainTour, setMainTour] = useState<Document | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [steps, setSteps] = useState<Step[]>([]);

  // Sets tour to current state result
  useEffect(
    () => {
      if (tour && tour.tours && !tour.loading) {
        setMainTour(filterById(PRISMIC_TOUR_ID, tour.tours));
      }
    },
    [tour],
  );

  // Fetches tour if not already in state
  useEffect(
    () => {
      if (!mainTour) {
        console.log('RegionTourButton', 'fetch tour by id');
        dispatch(fetchTourById(PRISMIC_TOUR_ID));
      }
      else {
        setMainTourSteps();
      }
    },
    [mainTour],
  );

  /**
   * Set steps of main tour
   */
  const setMainTourSteps = () => {
    if (mainTour) {
      const mainTourSteps: Step[] = [];
      mainTour.data.step.forEach(
        (step: TourStep) => {
          mainTourSteps.push({
            disableBeacon: true,
            hideCloseButton: true,
            target: `#main-tour-step-${step.step_id}`,
            content: <RichText render={step.description} />,
          });
        }
      );
      setSteps(mainTourSteps);
    }
  };

  const handleTourButtonClick = () => {
    setIsTourOpen(true);
  };

  const handleTourClose = () => {
    setIsTourOpen(false);
  };

  return (
    <>
      <Button
        className={classes.button}
        color="inverted"
        id="main-tour-step-show-walkthrough"
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
