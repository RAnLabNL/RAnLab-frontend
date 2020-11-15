import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    containerCopy: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '0.8em',
      letterSpacing: 1,
      marginTop: theme.spacing(1),
      textTransform: 'uppercase',
    },
  })
);

const AppLoading = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        size={50}
        thickness={5}
      />
      <div className={classes.containerCopy}>
        {t('app-loading')}
      </div>
    </div>
  );
};

export default AppLoading;
