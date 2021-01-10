import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Container from '@material-ui/core/Container';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import RegionLayout from '../components/layout/region-layout/RegionLayout';
import Button from '../components/base/Button';
import { Business } from '../store/types/business';
import { addBusinessByRegionId } from '../store/actions/business';

const testing = (): ReactElement => {
  const dispatch = useDispatch();

  const handleSubmit = async ({
    name,
    year_added,
    region,
    employees,
    latitude,
    longitude,
  }: {
    name: string,
    year_added: number,
    region: number,
    employees: number,
    latitude: number,
    longitude: number,
  }) => {
    const business: Business = {
      name,
      year_added,
      region,
      employees,
      location: [latitude, longitude],
    };
    dispatch(addBusinessByRegionId(region, business));
  };

  return (
    <RegionLayout>
      <Container maxWidth="md">
        <Formik
          initialValues={{
            name: '',
            year_added: 2021,
            region: 1,
            employees: 100,
            latitude: 47.50,
            longitude: 52.30,
          }}
          onSubmit={handleSubmit}
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
                name="region"
                label="Region ID"
                fullWidth
                required
                type="number"
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
