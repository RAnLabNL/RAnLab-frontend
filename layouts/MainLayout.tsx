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
      </Head>
      <CssBaseline />
      {children}
    </div>
  );
};

export default MainLayout;
