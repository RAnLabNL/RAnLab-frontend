import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PlaceIcon from '@material-ui/icons/Place';
import {
  ChangeEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import createShadow from '../../styles/helpers/createShadow';

const useStyles = makeStyles(
  (theme) => {
    const adornmentGutter = 10;
    return {
      inputLabel: {
        left: 49,
        top: theme.spacing(1.25),
        zIndex: 1,
        color: theme.palette.text.primary,
        [theme.breakpoints.up('sm')]: {
          color: theme.palette.highlight.contrastText,
        },
      },
      inputLabelFocused: {
        '&.Mui-focused': {
          color: `${theme.palette.text.primary} !important`,
        },
        [theme.breakpoints.up('sm')]: {
          '&.Mui-focused': {
            color: `${theme.palette.highlight.contrastText} !important`,
          },
        },
      },
      select: {
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
        paddingLeft: `${adornmentGutter + 4}px`,
        transition: theme.transitions.create(['background', 'box-shadow'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          background: theme.palette.background.paper,
        },
        '&.Mui-focused': {
          background: theme.palette.background.paper,
          boxShadow: `0 0 0 3px ${theme.palette.highlight.main}`,
        },
        [theme.breakpoints.up('sm')]: {
          color: theme.palette.highlight.contrastText,
          background: theme.gradients.blueTeal,
          '&:hover': {
            background: theme.gradients.blueTeal,
            boxShadow: createShadow(theme.palette.highlight.main, 3),
          },
          '&.Mui-focused': {
            background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, #118BDB 110%)`,
            boxShadow: theme.shadows[5],
          },
        },
      },
      selectIcon: {
        [theme.breakpoints.up('sm')]: {
          color: theme.palette.highlight.contrastText,
        },
      },
      selectSelect: {
        '&:focus': {
          background: 'none',
        },
      },
      selectMenu: {
        padding: `${theme.spacing(3.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px 0`,
      },
      placeIcon: {
        margin: `0 ${adornmentGutter}px -${theme.spacing(0.5)}px 0`,
      },
    };
  }
);

const componentName = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [region, setRegion] = useState(0);

  /**
   * Fired on region select change
   * @param e Target event
   */
  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setRegion(e.target.value as number);
  };

  const testData: string[] = [
    'Bay Bulls',
    'Holyrood',
    'Mount Pearl',
    'Petty Harbour',
    'Paradise',
    'Portugal Cove-St. Phillip\'s',
    'St. John\'s',
    'Torbay',
    'Witless Bay',
  ];

  return (
    <FormControl fullWidth>
      <InputLabel
        classes={{
          focused: classes.inputLabelFocused,
        }}
        className={classes.inputLabel}
        id="region-menu-label"
      >
        {t('region-menu-label')}
      </InputLabel>
      <Select
        classes={{
          icon: classes.selectIcon,
          select: classes.selectSelect,
          selectMenu: classes.selectMenu,
        }}
        className={classes.select}
        disableUnderline
        labelId="region-menu-label"
        id="region-menu"
        onChange={handleChange}
        startAdornment={
          <PlaceIcon className={classes.placeIcon} />
        }
        value={region}
        variant="filled"
      >
        {
          testData.map((region, index) => (
            <MenuItem
              key={region}
              value={index}
            >
              {region}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default componentName;
