import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from '../../../components/base/Button';
import Typography from '../../../components/base/Typography';
import { addRegion } from '../../../store/actions/region';

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
  { name: 'RanLabAddRegion' },
);

const AddRegion = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const handleRegionSubmit = async ({
    name,
  }: {
    name: string,
  }) => {
    const region = {
      name,
      manager: user.sub.split('auth0|')[1],
    };
    dispatch(addRegion(region));
  };

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        className={classes.typographyH1}
      >
        {t('add-region-title')}
      </Typography>
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
              variant="outlined"
              name="name"
              label={t('add-region-field-name')}
              fullWidth
              required
            />
            <div className={classes.containerSubmit}>
              <Button
                className={classes.buttonSubmit}
                color="primary"
                onClick={submitForm}
                variant="contained"
                size="large"
              >
                {t('add-region-title')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRegion;
