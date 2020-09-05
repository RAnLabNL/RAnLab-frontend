import Link from 'next/link';
import { ReactElement } from 'react';

const Home = (): ReactElement => (
  <div>
    <Link href="/region">
      <a>
        Region Dashboard
      </a>
    </Link>
  </div>
);

export default Home;
