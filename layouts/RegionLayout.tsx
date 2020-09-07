import { ReactNode, ReactElement } from 'react';

import MainLayout from './MainLayout';

type Props = {
  children?: ReactNode
  title?: string
};

const RegionLayout = ({ children, title }: Props): ReactElement => (
  <MainLayout title={title}>
    <div>
      Region Nav
    </div>
    <div>
      {children}
    </div>
  </MainLayout>
);

export default RegionLayout;
