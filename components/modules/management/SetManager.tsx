import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {};

const useStyles = makeStyles(
  () => ({
    root: {},
  })
);

const SetManager = ({}: Props): ReactElement => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <div>
      Add Manager
    </div>
  );
};

export default SetManager;
