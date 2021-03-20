import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setSelectedRegion } from '../../../store/actions/region';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      background: theme.palette.secondary.main,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '2rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1100,
    },
    linkBack: {
      color: theme.palette.secondary.contrastText,
      textDecoration: 'none',
      fontWeight: theme.typography.fontWeightBold,
      '&:visited, &:active': {
        color: theme.palette.secondary.contrastText,
      },
    },
    iconBack: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(0.5),
    },
  }),
  { name: 'RanLabAdminBackToAll' },
);

const AdminBackToAll = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(setSelectedRegion('all'));
  };

  return (
    <div className={classes.root}>
      <Link href="/admin">
        <a className={classes.linkBack} onClick={handleBackClick}>
          <KeyboardBackspaceIcon className={classes.iconBack} />
          {t('admin-back-to-all-button')}
        </a>
      </Link>
    </div>
  );
};

export default AdminBackToAll;
