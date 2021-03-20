import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import Button from '../../base/Button';
import Typography from '../../base/Typography';

type Props = {
  handleBack: () => void;
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    cardContent: {
      padding: theme.spacing(4),
    },
    typographyH2: {
      marginBottom: theme.spacing(2),
    },
    typographyBody: {
      marginBottom: theme.spacing(2),
    },
    containerActions: {
      textAlign: 'center',
    },
    buttonAction: {
      margin: theme.spacing(1),
    },
    gridItemImg: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    img: {
      width: '100%',
    },
  }),
  { name: 'RanLabBusinessesSaveSuccess' },
);

const BusinessesSaveSuccess = ({ handleBack }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const businessEditState = useSelector((state: RootState) => state.businessEdit);
  const [businessEditId, setBusinessEditId] = useState<string | undefined>();

  useEffect(
    () => {
      if (
        businessEditState
        && !businessEditState.loading
        && businessEditState.singleBusinessEdit
      ) {
        setBusinessEditId(businessEditState.singleBusinessEdit.id);
      }
    },
    []
  );

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            item
            md={8}
          >
            <Typography
              align="center"
              className={classes.typographyH2}
              variant="h2"
            >
              {t('businesses-save-success-heading')}
            </Typography>
            <Typography
              align="center"
              className={classes.typographyBody}
            >
              {t('businesses-save-success-body')}
            </Typography>
            <div className={classes.containerActions}>
              <Link href={`/edits/request?id=${businessEditId}`}>
                <Button
                  className={classes.buttonAction}
                  component="a"
                  variant="outlined"
                >
                  {t('businesses-save-success-action-view-request')}
                </Button>
              </Link>
              <Button
                className={classes.buttonAction}
                color="secondary"
                onClick={handleBack}
                variant="contained"
              >
                {t('businesses-save-success-action-back')}
              </Button>
            </div>
          </Grid>
          <Grid
            className={classes.gridItemImg}
            item
            md={4}
          >
            <img
              alt={t('businesses-save-success-img-alt')}
              className={classes.img}
              src="assets/region/edit-businesses-card.svg"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BusinessesSaveSuccess;
