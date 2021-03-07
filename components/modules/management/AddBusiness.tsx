import { Formik, Field, Form } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/base/Button';
import Typography from '../../../components/base/Typography';
import { RootState } from '../../../store';
import { addBusinessByRegionId } from '../../../store/actions/business';
import { Business } from '../../../store/types/business';

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    typographyH1: {
      marginBottom: theme.spacing(2),
    },
    containerSubmit: {
      textAlign: 'right',
    },
    buttonSubmit: {
      marginTop: theme.spacing(1),
    },
  }),
  { name: 'RanLabAddBusiness' },
);

const AddBusiness = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const dispatch = useDispatch();
  const regionState = useSelector((state: RootState) => state.region);

  const handleBusinessSubmit = async ({
    name,
    year_added,
    regionId,
    employees,
    latitude,
    longitude,
    industry,
  }: {
    name: string,
    year_added: number,
    regionId: string,
    employees: number,
    latitude: number,
    longitude: number,
    industry: string,
  }) => {
    const business: Business = {
      id: 'test',
      name,
      year_added,
      regionId,
      employees,
      location: [latitude, longitude],
      industry,
    };
    dispatch(addBusinessByRegionId(regionId, business));
  };

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        className={classes.typographyH1}
      >
        {t('add-business-title')}
      </Typography>
      {
        !regionState.loading && regionState.regions && !regionState.regions.length
          ? t('add-business-no-regions-error')
          : null
      }
      {
        !regionState.loading && regionState.regions && regionState.regions.length
          ? (
            <Formik
              initialValues={{
                name: '',
                year_added: 2021,
                regionId: 'NqgQV1AQaNgjtfYWtKJT',
                employees: 100,
                latitude: 47.50,
                longitude: 52.30,
                industry: 'Test Industry',
              }}
              onSubmit={handleBusinessSubmit}
            >
              {({ submitForm }) => (
                <Form>
                  <Field
                    component={TextField}
                    name="name"
                    label={t('add-business-field-name')}
                    fullWidth
                    required
                    variant="outlined"
                    margin="dense"
                  />
                  <Field
                    component={TextField}
                    name="year_added"
                    label={t('add-business-field-year-added')}
                    fullWidth
                    required
                    type="number"
                    variant="outlined"
                    margin="dense"
                  />
                  <FormControl
                    fullWidth
                    margin="dense"
                    variant="outlined"
                  >
                    <InputLabel htmlFor="region-id">
                      {t('add-business-field-region-id')}
                    </InputLabel>
                    <Field
                      component={Select}
                      inputProps={{
                        id: 'region-id',
                      }}
                      name="regionId"
                      variant="outlined"
                      required
                    >
                      <MenuItem value="">
                        --
                      </MenuItem>
                      {
                        regionState.regions && regionState.regions.map((region) => (
                          <MenuItem key={region.id} value={region.id}>
                            {region.name}
                          </MenuItem>
                        ))
                      }
                    </Field>
                  </FormControl>
                  <Field
                    component={TextField}
                    name="industry"
                    label={t('add-business-field-industry')}
                    fullWidth
                    required
                    variant="outlined"
                    margin="dense"
                  />
                  <Field
                    component={TextField}
                    name="employees"
                    label={t('add-business-field-employees')}
                    fullWidth
                    required
                    type="number"
                    variant="outlined"
                    margin="dense"
                  />
                  <Field
                    component={TextField}
                    name="latitude"
                    label={t('add-business-field-latitude')}
                    fullWidth
                    required
                    type="number"
                    variant="outlined"
                    margin="dense"
                  />
                  <Field
                    component={TextField}
                    name="longitude"
                    label={t('add-business-field-longitude')}
                    fullWidth
                    required
                    type="number"
                    variant="outlined"
                    margin="dense"
                  />
                  <div className={classes.containerSubmit}>
                    <Button
                      color="primary"
                      onClick={submitForm}
                      variant="contained"
                      className={classes.buttonSubmit}
                      size="large"
                    >
                      {t('add-business-title')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )
          : null
      }
    </div>
  );
};

export default AddBusiness;
