import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  fontSmoothOn,
  stripUl,
} from '../../styles/helpers/extend';

const items: TermsItem[] = [
  {
    text: 'region-sidebar-terms',
    url: '/terms',
  },
  {
    text: 'region-sidebar-about',
    url: '/about',
  },
  {
    text: 'region-sidebar-contact',
    url: '/contact',
  },
];

type Props = {
  isMenu?: boolean;
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      borderColor: theme.palette.divider,
      color: theme.palette.text.disabled,
      fontSize: '0.9em',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        fontSize: '0.9em',
      },
    },
    isMenu: {
      [theme.breakpoints.down('xs')]: {
        ...fontSmoothOn,
        color: theme.palette.primary.contrastText,
        fontSize: '0.9em',
      },
    },
    ulSubNav: {
      ...stripUl,
    },
    liSubNav: {
      display: 'inline-block',
    },
    linkSubNav: {
      color: 'inherit',
      padding: theme.spacing(0.5),
      textDecoration: 'none',
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
      '&:hover': {
        color: theme.palette.highlight.main,
      },
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          color: theme.palette.primary.main,
        },
      },
    },
  }),
  { name: 'RanLabTermsMenu' },
);

const TermsMenu = ({ isMenu }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  return (
    <div
      className={classNames(
        classes.root,
        {
          [classes.isMenu]: isMenu,
        }
      )}>
      <ul className={classes.ulSubNav}>
        {
          items.map(({ text, url }) => (
            <li
              className={classes.liSubNav}
              key={url}
            >
              <Link href={url}>
                <a className={classes.linkSubNav}>
                  {t(text)}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
      &copy; 2020 RAnLab
    </div>
  );
};

export interface TermsItem {
  text: string;
  url: string;
}

export default TermsMenu;
