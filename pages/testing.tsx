import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Container from '@material-ui/core/Container';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import RegionLayout from '../components/layout/region-layout/RegionLayout';
import Button from '../components/base/Button';
import { Business } from '../store/types/business';
import { addBusinessByRegionId } from '../store/actions/business';
import { addRegion } from '../store/actions/region';

const testing = (): ReactElement => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const handleRegionSubmit = async ({
    name,
  }: {
    name: string,
  }) => {
    const region = {
      name,
      manager: user.email,
    };
    dispatch(addRegion(region));
  };

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
    <RegionLayout>
      <Container maxWidth="md">
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={handleRegionSubmit}
        >
          {({ submitForm }) => (
            <Form>
              <Field
                component={TextField}
                name="name"
                label="Name"
                fullWidth
                required
              />
              <Button
                color="primary"
                onClick={submitForm}
                variant="contained"
              >
                Add Test Region
              </Button>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{
            name: '',
            year_added: 2021,
            regionId: 'Mp8EdMS71uAz52NTpLK1',
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
                label="Name"
                fullWidth
                required
              />
              <Field
                component={TextField}
                name="year_added"
                label="Year Added"
                fullWidth
                required
                type="number"
              />
              <Field
                component={TextField}
                name="regionId"
                label="Region ID"
                fullWidth
                required
              />
              <Field
                component={TextField}
                name="industry"
                label="Industry"
                fullWidth
                required
              />
              <Field
                component={TextField}
                name="employees"
                label="Employees"
                fullWidth
                required
                type="number"
              />
              <Field
                component={TextField}
                name="latitude"
                label="Latitude"
                fullWidth
                required
                type="number"
              />
              <Field
                component={TextField}
                name="longitude"
                label="Longitude"
                fullWidth
                required
                type="number"
              />
              <Button
                color="primary"
                onClick={submitForm}
                variant="contained"
              >
                Add Test Business
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </RegionLayout>
  );
};

export default testing;
