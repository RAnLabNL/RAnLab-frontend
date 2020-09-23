import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const Home = (): ReactElement => {
  const { t } = useTranslation('pages');
  return (
    <div>
      <Link href="/region">
        <a>
          {t('index-link-region-dashboard')}
        </a>
      </Link>
    </div>
  );
};

export default Home;
