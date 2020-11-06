import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const Home = (): ReactElement => {
  const { t } = useTranslation('pages');
  const { user } = useAuth0();

  console.log(user);

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
