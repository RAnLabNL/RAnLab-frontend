import MenuItem from '@material-ui/core/MenuItem';
import { ChangeEvent, ReactElement, useState } from 'react';

import FilterTextField from '../../base/FilterTextField';
import FilterSelect from '../../base/FilterSelect';

type Props = {
  defaultValue: number | string;
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

  // Used for id and name
  const id = `add-business-${field}`;

  const [ value, setValue ] = useState<string | number>(defaultValue);

  /**
   * Handles changes of field values, sends value change to parent component.
   * @param e Change event
   */
  const handleValueChange = (e: ChangeEvent<{ value: unknown }>) => {
    let newValue: string | number;

    if (field === 'year' || field === 'employment') {
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
      return (
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
      );
    case 'year':
      return (
        <FilterSelect
          handleChange={handleValueChange}
          id={id}
          label={label}
          name={id}
          value={value}
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
      );
    default:
      return (
        <FilterTextField
          onChange={handleValueChange}
          fullWidth
          id={id}
          label={label}
          name={id}
          type={field === 'employment' ? 'number' : 'text'}
          value={value}
        />
      );
  }
};

export default BusinessesAddCell;
