import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Button, { ButtonProps } from './Button';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      fontWeight: theme.typography.fontWeightMedium,
    },
    infoIcon: {
      color: theme.palette.primary.main,
    },
  }),
  { name: 'RanLabDataSources' },
);

const DataSources = (props: ButtonProps): ReactElement => {
  const {
    className: classNameProp,
    ...other
  } = props;

  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <Button
      className={
        classNames(
          classes.root,
          classNameProp,
        )
      }
      size="small"
      startIcon={
        <InfoIcon
          className={classes.infoIcon}
          fontSize="small"
        />
      }
      {...other}
    >
      {t('data-sources-button')}
    </Button>
  );
};

export default DataSources;
