import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

const Home = (): ReactElement => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.role !== null) {
      router.push(`/${user.role}`);
    }
  }, [user.role]);

  return (
    <div>Loading...</div>
  );
};

export default Home;
