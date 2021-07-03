import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ChangeEvent,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import FilterTextField from '../../base/FilterTextField';
import FilterSelect from '../../base/FilterSelect';

type Props = {
  defaultValue?: number | number[] | string;
  field: string;
  handleChange: (
    field: string,
    value: number | string,
  ) => void;
  label: string;
};

const BusinessesAddCell = (props: Props): ReactElement => {
  const {
    defaultValue,
    handleChange,
    field,
    label,
  } = props;
  const [value, setValue] = useState<string | number | number[] | undefined>(defaultValue);
  const [industriesLoading, setIndustriesLoading] = useState<boolean>(true);
  const filtersState = useSelector((state: RootState) => state.filters);

  // Used for id and name
  const id = `add-business-${field}`;

  useEffect(
    () => {
      if (
        !filtersState.loading
        && !filtersState.error
        && filtersState.industries
      ) {
        setIndustriesLoading(false);
      }
    },
    [filtersState.industries]
  );

  /**
   * Handles changes of field values, sends value change to parent component.
   * @param e Change event
   */
  const handleValueChange = (e: ChangeEvent<{ value: unknown }>) => {
    let newValue: string | number;

    if (field === 'year' || field === 'employees') {
      newValue = e.target.value as number;
      newValue = +newValue;
    }
    else {
      newValue = e.target.value as string;
    }

    setValue(newValue);
    handleChange(field, newValue);
  };

  switch (field) {
    case 'industry':
      return industriesLoading
        ? <CircularProgress />
        : (
          <FilterSelect
            FormControlProps={{
              fullWidth: true,
            }}
            handleChange={handleValueChange}
            id={id}
            label={label}
            name={id}
            value={value}
          >
            <MenuItem value="">
              --
            </MenuItem>
            {
              filtersState.industries
              && filtersState.industries.map((industry) => (
                <MenuItem value={industry} key={industry}>
                  {industry}
                </MenuItem>
              ))
            }
          </FilterSelect>
        );
    default:
      return (
        <FilterTextField
          onChange={handleValueChange}
          fullWidth
          id={id}
          label={label}
          name={id}
          type={field === 'employees' || field === 'year' ? 'number' : 'text'}
          value={field === 'employees' || field === 'year' ? undefined : value}
        />
      );
  }
};

export default BusinessesAddCell;
