import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { BusinessEdit } from '../../../store/types/businessEdit';

type Props = {
  businessEdit: BusinessEdit,
};

const useStyles = makeStyles(
  () => ({
    root: {},
  })
);

const EditRequestRegion = ({ businessEdit }: Props): ReactElement => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <div>
      Single edit request for region manager
    </div>
  );
};

export default EditRequestRegion;
