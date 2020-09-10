import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { ReactNode, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: ReactNode
  title?: string
};

const MainLayout = ({ children, title }: Props): ReactElement => {
  const { t } = useTranslation('common');
  return (
    <div>
      <Head>
        <title>
          {
            title ? `${title} | ` : ''
          }
          {t('app-name')}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CssBaseline />
      {children}
    </div>
  );
};

export default MainLayout;
