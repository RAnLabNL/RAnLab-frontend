import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import DownloadReportLearnMoreDialog from './DownloadReportLearnMoreDialog';
import Typography from './Typography';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      background: theme.gradients.blueTeal,
      color: theme.palette.highlight.contrastText,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      position: 'relative',
      textAlign: 'center',
      '&:before': {
        background: 'url(assets/region/download-report-card.svg) no-repeat bottom center',
        backgroundSize: 'contain',
        bottom: -10,
        content: '""',
        display: 'block',
        height: '100%',
        left: '20%',
        position: 'absolute',
        width: '60%',
        zIndex: 0,
      },
    },
    cardContent: {
      margin: '0 auto',
      maxWidth: '24rem',
      position: 'relative',
      zIndex: 1,
    },
    typographyH2: {
      marginBottom: theme.spacing(1.5),
    },
    typographyBody: {
      marginBottom: theme.spacing(2),
    },
    buttonCta: {
      color: theme.palette.highlight.dark,
    },
    linkLearnMore: {
      color: 'inherit',
      display: 'inline-block',
      marginTop: theme.spacing(1),
    },
  })
);

const DownloadReportCard = (): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [
    learnMoreDialogOpen,
    setLearnMoreDialogOpen,
  ] = useState(false);

  const handleCtaClick = () => {
    window.open('/assets/fixture/test-report.pdf');
  };

  const handleLearnMoreClick = (e: MouseEvent) => {
    e.preventDefault();
    setLearnMoreDialogOpen(true);
  };

  const handleLearnMoreDialogClose = () => {
    setLearnMoreDialogOpen(false);
  };

  return (
    <Card
      className={classes.root}
      elevation={0}
    >
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.typographyH2}
          color="inherit"
          variant="h2"
        >
          {t('download-report-card-heading')}
        </Typography>
        <Typography
          className={classes.typographyBody}
          color="inherit"
        >
          {t('download-report-card-body')}
        </Typography>
        <div>
          <Button
            className={classes.buttonCta}
            color="inverted"
            endIcon={
              <GetAppIcon fontSize="small" />
            }
            onClick={handleCtaClick}
            variant="contained"
          >
            {t('download-report-card-cta')}
          </Button>
        </div>
        <a
          className={classes.linkLearnMore}
          href="#"
          onClick={handleLearnMoreClick}
        >
          {t('download-report-card-learn-more')}
        </a>
        <DownloadReportLearnMoreDialog
          open={learnMoreDialogOpen}
          onClose={handleLearnMoreDialogClose}
        />
      </CardContent>
    </Card>
  );
};

export default DownloadReportCard;
