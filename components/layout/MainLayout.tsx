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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>
          {
            title ? `${title} | ` : ''
          }
          {t('app-name')}
        </title>
      </Head>
      <div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
