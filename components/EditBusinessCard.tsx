import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import EditBusinessLearnMoreDialog from './EditBusinessLearnMoreDialog';
import Typography from './Typography';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '100%',
      textAlign: 'center',
    },
    cardContent: {
      [theme.breakpoints.up(700)]: {
        padding: theme.spacing(3),
        '&:last-child': {
          paddingBottom: theme.spacing(3),
        },
      },
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(4),
        '&:last-child': {
          paddingBottom: theme.spacing(4),
        },
      },
    },
    gridItemCopy: {
      [theme.breakpoints.between(700, 'md')]: {
        flex: '0 0 70%',
      },
    },
    typographyH2: {
      marginBottom: theme.spacing(1),
    },
    typographyBody: {
      marginBottom: theme.spacing(2),
    },
    linkLearnMore: {
      color: theme.palette.secondary.dark,
      display: 'inline-block',
      marginTop: theme.spacing(1),
      '&:visited, &:active': {
        color: theme.palette.secondary.dark,
      },
    },
    gridItemImg: {
      [theme.breakpoints.down(700)]: {
        display: 'none',
      },
      [theme.breakpoints.between(700, 'md')]: {
        flex: '0 0 30%',
      },
    },
    img: {
      width: '100%',
    },
  })
);

const EditBusinessCard = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [
    learnMoreDialogOpen,
    setLearnMoreDialogOpen,
  ] = useState(false);

  const handleLearnMoreClick = (e: MouseEvent) => {
    e.preventDefault();
    setLearnMoreDialogOpen(true);
  };

  const handleLearnMoreDialogClose = () => {
    setLearnMoreDialogOpen(false);
  };

  return (
    <Card elevation={3} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            className={classes.gridItemCopy}
            item
            md={8}
          >
            <Typography
              className={classes.typographyH2}
              variant="h2"
            >
              {t('edit-businesses-card-heading')}
            </Typography>
            <Typography className={classes.typographyBody}>
              {t('edit-businesses-card-body')}
            </Typography>
            <Link href="/businesses">
              <Button
                color="secondary"
                variant="contained"
              >
                {t('edit-businesses-card-cta')}
              </Button>
            </Link>
            <div>
              <a
                className={classes.linkLearnMore}
                href="#"
                onClick={handleLearnMoreClick}
              >
                {t('edit-businesses-card-learn-more')}
              </a>
              <EditBusinessLearnMoreDialog
                open={learnMoreDialogOpen}
                onClose={handleLearnMoreDialogClose}
              />
            </div>
          </Grid>
          <Grid
            className={classes.gridItemImg}
            item
            md={4}
          >
            <img
              alt={t('edit-businesses-card-img-alt')}
              className={classes.img}
              src="assets/region/edit-businesses-card.svg"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EditBusinessCard;
