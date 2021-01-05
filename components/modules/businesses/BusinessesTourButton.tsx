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
import Tour from '../../base/Tour';

const PRISMIC_TOUR_ID = 'businesses-tour';
const PRISMIC_TOUR_ID_EDIT_MODE = 'businesses-tour-edit-mode';

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
  const dispatch = useDispatch();

  const tour = useSelector((state: RootState) => state.tour);
  const [businessesTour, setBusinessesTour] = useState<Document | null>(null);
  const [editTour, setEditTour] = useState<Document | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [defaultSteps, setDefaultSteps] = useState<Step[]>([]);
  const [editingSteps, setEditingSteps] = useState<Step[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  // Sets tours to current state result
  useEffect(
    () => {
      if (tour && tour.tours && !tour.loading) {
        const stateBusinessesTour = filterById(PRISMIC_TOUR_ID, tour.tours);
        if (stateBusinessesTour) {
          setBusinessesTour(stateBusinessesTour);
        }

        const stateEditTour = filterById(PRISMIC_TOUR_ID_EDIT_MODE, tour.tours);
        if (stateEditTour) {
          setEditTour(stateEditTour);
        }
      }
    },
    [tour],
  );

  const getSteps = (steps: TourStep[]): Step[] => {
    const joyrideSteps: Step[] = [];
    steps.forEach(
      (step: TourStep) => {
        joyrideSteps.push({
          disableBeacon: true,
          hideCloseButton: true,
          target: `#businesses-tour-step-${step.step_id}`,
          content: <RichText render={step.description} />,
        });
      }
    );
    return joyrideSteps;
  };

  // Fetches business tour if not already in state
  useEffect(
    () => {
      if (!businessesTour) {
        dispatch(fetchTourById(PRISMIC_TOUR_ID));
      }
      else {
        setDefaultSteps(getSteps(businessesTour.data.step));
      }
    },
    [businessesTour],
  );

  // Fetches edit mode tour if not already in state
  useEffect(
    () => {
      if (!editTour) {
        dispatch(fetchTourById(PRISMIC_TOUR_ID_EDIT_MODE));
      }
      else {
        setEditingSteps(getSteps(editTour.data.step));
      }
    },
    [editTour],
  );

  // Set proper default steps once both tours loaded
  useEffect(
    () => {
      if (defaultSteps.length && editingSteps.length) {
        setSteps(editingEnabled ? editingSteps : defaultSteps);
      }
    },
    [defaultSteps, editingSteps]
  );

  const handleTourButtonClick = () => {
    setIsTourOpen(true);
  };

  const handleTourClose = () => {
    setIsTourOpen(false);
  };

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
