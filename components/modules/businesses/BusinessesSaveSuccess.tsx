import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

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
  })
);

const BusinessesSaveSuccess = ({ handleBack }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();

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
              <Button
                className={classes.buttonAction}
                onClick={handleBack}
                variant="outlined"
              >
                {t('businesses-save-success-action-view-request')}
              </Button>
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
