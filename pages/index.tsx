import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const Home = (): ReactElement => {
  const { t } = useTranslation('page-index');
  return (
    <div>
      <Link href="/region">
        <a>
          {t('link-region-dashboard')}
        </a>
      </Link>
    </div>
  );
};

export default Home;
