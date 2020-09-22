import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {
  ChangeEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Typography from './Typography';

// type Props = {};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    fieldset: {
      border: 'none',
      marginTop: theme.spacing(2),
      padding: 0,
    },
    submitContainer: {
      marginTop: theme.spacing(2),
      textAlign: 'right',
    },
  })
);

const ProfileForm = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [province, setProvince] = useState('');

  const handleProvinceChange = (e: ChangeEvent<{ value: unknown }>) => {
    setProvince(e.target.value as string);
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="first-name"
            name="first-name"
            label={t('profile-form-first-name')}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="last-name"
            name="last-name"
            label={t('profile-form-last-name')}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </Grid>
      </Grid>

      <TextField
        id="institution"
        name="institution"
        label={t('profile-form-institution')}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="job-title"
        name="job-title"
        label={t('profile-form-job-title')}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="phone-number"
        name="phone-number"
        label={t('profile-form-phone-number')}
        fullWidth
        variant="outlined"
        margin="normal"
      />

      <fieldset className={classes.fieldset}>
        <Typography
          variant="h2"
          component="legend"
        >
          {t('profile-form-work-address-legend')}
        </Typography>
        <TextField
          id="work-street-address"
          name="work-street-address"
          label={t('profile-form-work-street-address')}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={9}>
            <TextField
              id="work-city-town"
              name="work-city-town"
              label={t('profile-form-work-city')}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <InputLabel id="work-province-label">
                {t('profile-form-work-province')}
              </InputLabel>
              <Select
                id="work-province"
                name="work-province"
                labelId="work-province-label"
                onChange={handleProvinceChange}
                label={t('profile-form-work-province')}
                value={province}
              >
                <MenuItem value="">
                  --
                </MenuItem>
                <MenuItem value="NL">
                  NL
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
       
        <TextField
          id="work-postal-code"
          name="work-postal-code"
          label={t('profile-form-work-postal-code')}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </fieldset>

      <div className={classes.submitContainer}>
        <Button
          color="secondary"
          variant="contained"
        >
          {t('profile-form-submit')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
