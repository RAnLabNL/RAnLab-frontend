import { Formik, Field, Form } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { RootState } from '../../../store';
import { setUserProfile } from '../../../store/actions/user';
import { UserProfile } from '../../../store/types/user';
import Button from '../../base/Button';
import Typography from '../../base/Typography';
import AppLoading from '../../base/AppLoading';

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    fieldset: {
      border: 'none',
      marginTop: theme.spacing(2),
      padding: 0,
    },
    formControlProvince: {
      textAlign: 'left',
    },
    containerSubmit: {
      marginTop: theme.spacing(2),
      textAlign: 'right',
    },
    containerError: {
      color: theme.palette.error.main,
      marginTop: theme.spacing(2),
    },
  }),
  { name: 'RanLabProfileForm' },
);

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

const ProfileForm = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [profileSaving, setProfileSaving] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({});
  const [alertSnackbarOpen, setAlertSnackbarOpen] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('profile-form-first-name-error')),
    lastName: Yup.string()
      .required(t('profile-form-last-name-error')),
    institution: Yup.string()
      .required(t('profile-form-institution-error')),
    jobTitle: Yup.string()
      .required(t('profile-form-job-title-error')),
    phone: Yup.string()
      .required(t('profile-form-phone-error-required'))
      .matches(phoneRegex, t('profile-form-phone-error-invalid')),
    streetAddress: Yup.string()
      .required(t('profile-form-street-address-error')),
    city: Yup.string()
      .required(t('profile-form-city-error')),
    province: Yup.string()
      .required(t('profile-form-province-error')),
    postalCode: Yup.string()
      .required(t('profile-form-postal-code-error-required'))
      .matches(postalRegex, t('profile-form-postal-code-error-invalid')),
  });

  const isProfileEmpty =
      user.profile
      && user.profile.constructor === Object && Object.keys(user.profile).length === 0;

  const handleSubmit = async (values: UserProfile) => {
    dispatch(setUserProfile(values));
    setProfileSaving(true);
  };

  const handleAlertSnackbarClose = () => {
    setAlertSnackbarOpen(false);
  };

  useEffect(() => {
    if (!user.profileLoading && user.error && profileSaving) {
      setAlertInfo({
        message: t('profile-form-submit-error'),
        severity: 'error',
      });
      setAlertSnackbarOpen(true);
      setProfileSaving(false);
    }
    if (!user.profileLoading && !user.error && profileSaving) {
      setAlertInfo({
        message: t('profile-form-submit-success'),
        severity: 'success',
      });
      setAlertSnackbarOpen(true);
      setProfileSaving(false);
    }
  }, [user.profileLoading, user.profile, user.error]);

  const getDefaultValue = (key: Extract<keyof UserProfile, string>): string => {
    let defaultVal: string | undefined = '';
    if (
      user.profile !== null
      && user.profile !== undefined
      && !isProfileEmpty
      && !Array.isArray(user.profile[key])
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultVal = user.profile[key];
    }

    return defaultVal === undefined ? '' : defaultVal;
  };

  if (
    !profileSaving && user.loading
  ) {
    return <AppLoading />;
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: getDefaultValue('firstName'),
          lastName: getDefaultValue('lastName'),
          institution: getDefaultValue('institution'),
          jobTitle: getDefaultValue('jobTitle'),
          phone: getDefaultValue('phone'),
          streetAddress: getDefaultValue('streetAddress'),
          city: getDefaultValue('city'),
          province: getDefaultValue('province'),
          postalCode: getDefaultValue('postalCode'),
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting, isValid, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="firstName"
                  label={t('profile-form-first-name')}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="lastName"
                  label={t('profile-form-last-name')}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>

            <Field
              component={TextField}
              name="institution"
              label={t('profile-form-institution')}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <Field
              component={TextField}
              name="jobTitle"
              label={t('profile-form-job-title')}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <Field
              component={TextField}
              name="phone"
              label={t('profile-form-phone')}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />

            <fieldset className={classes.fieldset}>
              <Typography
                variant="h2"
                component="legend"
              >
                {t('profile-form-work-address-legend')}
              </Typography>
              <Field
                component={TextField}
                name="streetAddress"
                label={t('profile-form-street-address')}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={7} md={9}>
                  <Field
                    component={TextField}
                    name="city"
                    label={t('profile-form-city')}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={3}>
                  <FormControl
                    className={classes.formControlProvince}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.province && errors.province)}
                  >
                    <InputLabel htmlFor="province">
                      {t('profile-form-province')}
                    </InputLabel>
                    <Field
                      component={Select}
                      inputProps={{
                        id: 'province',
                      }}
                      name="province"
                      required
                    >
                      <MenuItem value="">
                        --
                      </MenuItem>
                      <MenuItem value="NL">
                        NL
                      </MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
            
              <Field
                component={TextField}
                name="postalCode"
                label={t('profile-form-postal-code')}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </fieldset>

            <div className={classes.containerSubmit}>
              <Button
                color="secondary"
                disabled={isSubmitting || !isValid}
                onClick={submitForm}
                variant="contained"
              >
                {t('profile-form-submit')}
              </Button>
              {
                !isValid
                  ? (
                    <div className={classes.containerError}>
                      {t('profile-form-validation-error')}
                    </div>
                  )
                  : null
              }
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar
        autoHideDuration={3000}
        open={alertSnackbarOpen}
        onClose={handleAlertSnackbarClose}
      >
        <Alert
          onClose={handleAlertSnackbarClose}
          severity={alertInfo.severity}
          variant="filled"
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </>
  );
};

interface AlertInfo {
  message?: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
}

export default ProfileForm;
