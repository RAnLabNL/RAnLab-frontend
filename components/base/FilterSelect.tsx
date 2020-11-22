import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';

type Props = {
  FormControlProps?: FormControlProps;
  SelectProps?: SelectProps;
  children: SelectProps['children'];
  handleChange: SelectProps['onChange'];
  id: string;
  label: string;
  name: string;
  value: SelectProps['value'];
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    inputLabel: {
      fontSize: '1em',
    },
    inputLabelOutlined: {
      transform: 'translate(12px, 8px) scale(1)',
    },
    selectOutlined: {
      background: theme.palette.background.paper,
      padding: '6px 25px 6px 14px;',
    },
  }),
  { name: 'RanLabFilterSelect' },
);

const componentName = (props: Props): ReactElement => {
  const {
    FormControlProps,
    SelectProps,
    children,
    handleChange,
    id,
    label,
    name,
    value,
  } = props;
  const selectClasses = SelectProps && SelectProps.classes ? SelectProps.classes : {};

  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      {...FormControlProps}
    >
      <InputLabel
        classes={{
          outlined: classes.inputLabelOutlined,
        }}
        className={classes.inputLabel}
        id={`${id}-label`}
      >
        {label}
      </InputLabel>
      <Select
        classes={{
          outlined: classes.selectOutlined,
          ...selectClasses,
        }}
        id={id}
        name={name}
        labelId={`${id}-label`}
        onChange={handleChange}
        label={label}
        value={value}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default componentName;
