import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  Props as JoyrideProps,
} from 'react-joyride';

import { primary as primaryColor } from '../../styles/theme/_palette';

const Tour = (props: TourProps): ReactElement => {
  const {
    handleClose,
    open,
    steps,
    ...other
  } = props;
  const { t } = useTranslation('components');

  const [run, setRun] = useState<boolean>(open);

  const handleTourChange = (tourProps: CallBackProps) => {
    const { status } = tourProps;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      handleClose();
    }
  };

  useEffect(
    () => {
      setRun(open);
    },
    [open]
  );

  const tourLocale = {
    back: t('tour-back'),
    close: t('tour-close'),
    last: t('tour-last'),
    next: t('tour-next'),
    skip: t('tour-skip'),
  };

  return (
    <Joyride
      callback={handleTourChange}
      continuous={true}
      showProgress={true}
      locale={tourLocale}
      showSkipButton={true}
      steps={steps}
      styles={{
        options: {
          primaryColor,
          zIndex: 10000,
        },
      }}
      run={run}
      {...other}
    />
  );
};

interface TourProps extends JoyrideProps {
  handleClose: () => void;
  open: boolean,
  steps: Step[],
}

export default Tour;
