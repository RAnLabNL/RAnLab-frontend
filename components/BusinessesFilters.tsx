import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
  ChangeEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import FilterSelect from './FilterSelect';
import FilterTextField from './FilterTextField';
import Typography from './Typography';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      border: 'none',
      margin: 0,
      padding: 0,
    },
    legendFilters: {
      color: theme.palette.text.disabled,
    },
    filterSelectYear: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    filterSelectYearSelect: {
      minWidth: 22,
    },
    filterSelectIndustry: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    filterSelectIndustrySelect: {
      minWidth: 46,
    },
    filterTextFieldName: {
      maxWidth: '100%',
    },
  })
);

const Businesses = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

  const [year, setYear] = useState('');
  const [industry, setIndustry] = useState('');

  const handleYearChange = (e: ChangeEvent<{ value: unknown }>) => {
    setYear(e.target.value as string);
  };

  const handleIndustryChange = (e: ChangeEvent<{ value: unknown }>) => {
    setIndustry(e.target.value as string);
  };

  return (
    <fieldset className={classes.root}>
      <Grid
        alignItems="center"
        container
        spacing={1}
      >
        <Grid item xs={12} md="auto">
          <Typography
            className={classes.legendFilters}
            component="legend"
            variant="subtitle2"
          >
            {t('businesses-filter-legend')}:
          </Typography>
        </Grid>
        <Grid item xs={3} md="auto">
          <FilterSelect
            FormControlProps={{
              classes: {
                root: classes.filterSelectYear,
              },
            }}
            SelectProps={{
              classes: {
                select: classes.filterSelectYearSelect,
              },
            }}
            handleChange={handleYearChange}
            id="filter-year"
            label={t('businesses-filter-year-label')}
            name="filter-year"
            value={year}
          >
            <MenuItem>
              --
            </MenuItem>
            <MenuItem value="2020">
              2020
            </MenuItem>
            <MenuItem value="2019">
              2019
            </MenuItem>
            <MenuItem value="2018">
              2018
            </MenuItem>
            <MenuItem value="2017">
              2017
            </MenuItem>
          </FilterSelect>
        </Grid>
        <Grid item xs={4} md="auto">
          <FilterSelect
            FormControlProps={{
              classes: {
                root: classes.filterSelectIndustry,
              },
            }}
            SelectProps={{
              classes: {
                select: classes.filterSelectIndustrySelect,
              },
            }}
            handleChange={handleIndustryChange}
            id="filter-industry"
            label={t('businesses-filter-industry-label')}
            name="filter-industry"
            value={industry}
          >
            <MenuItem>
              --
            </MenuItem>
            <MenuItem value="0">
              Forestry
            </MenuItem>
            <MenuItem value="1">
              Oil &amp; Gas
            </MenuItem>
            <MenuItem value="2">
              Technology
            </MenuItem>
          </FilterSelect>
        </Grid>
        <Grid item xs={5} md="auto">
          <FilterTextField
            className={classes.filterTextFieldName}
            id="filter-name"
            name="filter-name"
            label={t('businesses-filter-name-label')}
            InputProps={{
              endAdornment: (
                <SearchIcon fontSize="small" />
              ),
            }}
          />
        </Grid>
      </Grid>
    </fieldset>
  );
};

export default Businesses;
