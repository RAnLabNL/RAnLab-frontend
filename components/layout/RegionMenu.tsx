import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PlaceIcon from '@material-ui/icons/Place';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from  'react-redux';

import { RootState } from '../../store';
import { fetchRegions, getSelectedRegion, setSelectedRegion } from '../../store/actions/region';
import { Region } from '../../store/types/region';
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
  },
  { name: 'RanLabRegionMenu' },
);

const componentName = (): ReactElement => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [region, setRegion] = useState<string>('');
  const regionState = useSelector((state: RootState) => state.region);
  const user = useSelector((state: RootState) => state.user);

  useEffect(
    () => {
      if (
        regionState.selectedRegion
        && regionState.selectedRegion !== 'all'
        && regionState.selectedRegion.id !== region
      ) {
        setRegion(regionState.selectedRegion.id);
      }
      if (
        regionState.selectedRegion
        && regionState.selectedRegion === 'all'
      ) {
        setRegion(regionState.selectedRegion);
      }
    },
    [regionState.selectedRegion]
  );

  useEffect(
    () => {
      if (!regionState.regions) {
        dispatch(fetchRegions());
      }
      else {
        dispatch(getSelectedRegion());
      }
    },
    [regionState.regions]
  );

  /**
   * Fired on region select change
   * @param e Target event
   */
  const handleChange = (
    e: ChangeEvent<{ value: unknown }>
  ) => {
    const { value } = e.target;
    let selectedRegion: Region | 'all' = 'all';

    setRegion(value as string);

    if (regionState.regions && value !== 'all') {
      const regionFromList = regionState.regions.filter(region => {
        return region.id == value;
      });
      selectedRegion = regionFromList[0];
    }
    dispatch(setSelectedRegion(selectedRegion));
    navigateToPage(selectedRegion);
  };

  const navigateToPage = (selectedRegion: Region | 'all') => {
    if (
      user.role === 'admin'
      && selectedRegion !== 'all'
      && router.pathname !== '/region'
      && router.pathname !== '/businesses'
    ) {
      router.push('/region');
    }

    if (
      user.role === 'admin'
      && selectedRegion === 'all'
      && router.pathname !== '/management'
      && router.pathname !== '/edits'
    ) {
      router.push('/edits');
    }
  };

  if (!regionState.loading && regionState.regions && !regionState.regions.length) {
    return (
      <div>
        {t('region-menu-no-regions-error')}
      </div>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel
        classes={{
          focused: classes.inputLabelFocused,
        }}
        className={classes.inputLabel}
        htmlFor="region-menu"
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
          user.role === 'admin'
            ? (
              <MenuItem value="all">
                {t('region-menu-all-regions')}
              </MenuItem>
            )
            : null
        }
        {
          regionState.regions
            ? regionState.regions.map((stateRegion) => (
              <MenuItem
                key={stateRegion.id}
                value={stateRegion.id}
              >
                {stateRegion.name}
              </MenuItem>
            ))
            : null
        }
      </Select>
    </FormControl>
  );
};

export default componentName;
