import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { MouseEvent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../base/Button';

type Props = {
  disabled?: boolean;
  handleAddClick?: (e: MouseEvent) => void;
  handleRemoveClick?: (e: MouseEvent) => void;
  type?: 'add' | 'default';
};

const BusinessesActionCell = (props: Props): ReactElement => {
  const {
    disabled,
    handleAddClick,
    handleRemoveClick,
    type,
  } = props;
  const { t } = useTranslation('components');

  if (type === 'add') {
    return (
      <Button
        disabled={disabled}
        color="primary"
        onClick={handleAddClick}
        size="small"
        startIcon={
          <AddIcon fontSize="small" />
        }
        variant="contained"
      >
        {t('businesses-action-cell-add')}
      </Button>
    );
  }
  else {
    return (
      <IconButton
        onClick={handleRemoveClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    );
  }
};

export default BusinessesActionCell;
