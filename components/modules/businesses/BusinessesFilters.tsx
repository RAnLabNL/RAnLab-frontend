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

import FilterSelect from '../../base/FilterSelect';
import FilterTextField from '../../base/FilterTextField';
import Typography from '../../base/Typography';

type Props = {
  setBusinessIndustryFilter: (industry: string) => void,
  setBusinessNameFilter: (name: string) => void,
  setBusinessYearFilter: (year: number) => void,
};

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

const Businesses = (props: Props): ReactElement => {
  const {
    setBusinessIndustryFilter,
    setBusinessNameFilter,
    setBusinessYearFilter,
  } = props;
  const { t } = useTranslation('components');
  const { t: tCommon } = useTranslation('common');
  const classes = useStyles();

  const [year, setYear] = useState('');
  const [industry, setIndustry] = useState('');

  const handleYearChange = (e: ChangeEvent<{ value: unknown }>) => {
    const yearValue = e.target.value as string;
    setYear(yearValue);
    setBusinessYearFilter(+yearValue);
  };

  const handleIndustryChange = (e: ChangeEvent<{ value: unknown }>) => {
    const industryValue = e.target.value as string;
    setIndustry(industryValue);
    setBusinessIndustryFilter(industryValue);
  };

  const handleNameChange = (e: ChangeEvent<{ value: unknown }>) => {
    const nameValue = e.target.value as string;
    setBusinessNameFilter(nameValue);
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
            label={tCommon('businesses-year')}
            name="filter-year"
            value={year}
          >
            <MenuItem value="">
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
            label={tCommon('businesses-industry')}
            name="filter-industry"
            value={industry}
          >
            <MenuItem value="">
              --
            </MenuItem>
            <MenuItem value="Air transportation">
              Air transportation
            </MenuItem>
            <MenuItem value="Construction">
              Construction
            </MenuItem>
            <MenuItem value="Building material and garden equipment and supplies dealers">
              Building material and garden equipment and supplies dealers
            </MenuItem>
          </FilterSelect>
        </Grid>
        <Grid item xs={5} md="auto">
          <FilterTextField
            className={classes.filterTextFieldName}
            id="filter-name"
            name="filter-name"
            onChange={handleNameChange}
            label={tCommon('businesses-name')}
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
