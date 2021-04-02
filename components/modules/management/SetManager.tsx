import { Formik, Field, Form } from 'formik';
import { Select } from 'formik-material-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import Button from '../../../components/base/Button';
import Typography from '../../../components/base/Typography';
import { fetchAllUsers, setUserManagerById } from '../../../store/actions/user';
import { UserProfile } from '../../../store/types/user';

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
  { name: 'RanLabSetManager' },
);

const SetManager = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const dispatch = useDispatch();
  const regionState = useSelector((state: RootState) => state.region);
  const userState = useSelector((state: RootState) => state.user);
  const [userList, setUserList] = useState<UserProfile[]>([]);

  useEffect(
    () => {
      if (
        userState
        && userState.allUsers
        && Object.keys(userState.allUsers).length === 0
        && userState.allUsers.constructor === Object
      ) {
        dispatch(fetchAllUsers());
      }
    },
    [],
  );

  useEffect(
    () => {
      if (
        userState
        && !userState.loading
        && userState.allUsers
        && Object.keys(userState.allUsers).length > 0
        && userState.allUsers.constructor === Object
      ) {
        const users: UserProfile[] = [];
        Object.entries(userState.allUsers).forEach(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([id, user]) => {
            users.push(user);
          }
        );
        setUserList(users);
      }
    },
    [userState.allUsers]
  );

  const handleSetManagerSubmit = async ({
    userId,
    regionId,
  }: {
    userId: string,
    regionId: string,
  }) => {
    if (userState && userState.allUsers) {
      const manages = userState.allUsers[userId].manages || [];
      if (!manages.includes(regionId)) {
        manages.push(regionId);
      }
      dispatch(setUserManagerById(userId, manages));
    }
  };

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        className={classes.typographyH1}
      >
        {t('set-manager-title')}
      </Typography>
      {
        !regionState.loading && regionState.regions && !regionState.regions.length
          ? t('add-business-no-regions-error')
          : null
      }
      <Formik
        initialValues={{
          userId: '',
          regionId: '',
        }}
        onSubmit={handleSetManagerSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <FormControl
              fullWidth
              margin="dense"
              variant="outlined"
            >
              <InputLabel htmlFor="user-id">
                {t('set-manager-field-user-id')}
              </InputLabel>
              <Field
                component={Select}
                inputProps={{
                  id: 'user-id',
                }}
                name="userId"
                variant="outlined"
                required
              >
                <MenuItem value="">
                  --
                </MenuItem>
                {
                  userList.length && userList.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </MenuItem>
                  ))
                }
              </Field>
            </FormControl>
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
            <div className={classes.containerSubmit}>
              <Button
                className={classes.buttonSubmit}
                color="primary"
                onClick={submitForm}
                variant="contained"
                size="large"
              >
                {t('set-manager-title')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SetManager;
