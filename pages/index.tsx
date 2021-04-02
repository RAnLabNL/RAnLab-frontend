import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AppLoading from '../components/base/AppLoading';
import { RootState } from '../store';

const Home = (): ReactElement => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  console.log('index load');

  useEffect(() => {
    if (user.role !== null && user.role === 'region') {
      router.push(`/${user.role}`);
    }

    if (user.role !== null && user.role === 'admin') {
      router.push(`/edits`);
    }
  }, [user.role]);

  return <AppLoading />;
};

export default Home;
