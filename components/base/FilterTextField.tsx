import classNames from 'classnames';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    inputOutlined: {
      background: theme.palette.background.paper,
    },
    inputOutlinedAdornedEnd: {
      // Can't access InputBase classes, so need necessary evil here
      paddingRight: '8px !important',
    },
    inputOutlinedinput: {
      fontSize: '0.9em',
      padding: '7px 14px',
    },
    inputLabelOutlined: {
      fontSize: '1em',
      transform: 'translate(14px, 8px) scale(1)',
    },
  }),
  { name: 'RanLabFilterTextField' },
);

const FilterTextField = (props: TextFieldProps): ReactElement => {
  const {
    InputProps,
    InputLabelProps,
    ...other
  } = props;
  const classes = useStyles();

  const hasEndAdornment = InputProps && InputProps.endAdornment;

  return (
    <TextField
      InputProps={{
        classes: {
          root: classNames(
            classes.inputOutlined,
            {
              [classes.inputOutlinedAdornedEnd]: hasEndAdornment,
            }
          ),
          input: classes.inputOutlinedinput,
        },
        ...InputProps,
      }}
      InputLabelProps={{
        classes: {
          outlined: classes.inputLabelOutlined,
        },
        ...InputLabelProps,
      }}
      className={classes.root}
      variant="outlined"
      {...other}
    />
  );
};

export default FilterTextField;
