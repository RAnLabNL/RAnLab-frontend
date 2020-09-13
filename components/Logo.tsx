import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  forwardRef,
  ReactElement,
  ElementType,
} from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  Component?: ElementType,
  className?: string,
  singleColor?: boolean,
  variant?: 'tagline' | 'standalone' | 'icon',
};

const useStyles = makeStyles(
  () => ({
    root: {
      background: 'url(/assets/logos/logo-color-tagline.svg) no-repeat center center',
      backgroundSize: 'contain',
      display: 'block',
      fontSize: 0,
      height: 0,
      paddingBottom: '37%',
      width: '100%',
    },
    standalone: {
      backgroundImage: 'url(/assets/logos/logo-color-standalone.svg)',
    },
  })
);

const Logo = forwardRef((props: Props, ref): ReactElement => {
  const {
    Component = 'a',
    className: classNameProp,
    singleColor,
    variant,
    ...other
  } = props;
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <Component
      className={classNames(
        classes.root,
        {
          [classes.standalone]: variant === 'standalone' && !singleColor,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      {t('app-name')}
    </Component>
  );
});

Logo.displayName = 'Logo';

export default Logo;
