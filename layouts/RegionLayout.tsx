import { ReactNode, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import MainLayout from './MainLayout';

type Props = {
  children?: ReactNode
  title?: string
};

const RegionLayout = ({ children, title }: Props): ReactElement => {
  const { t } = useTranslation('layout-region');
  return (
    <MainLayout title={title}>
      <div>
        {t('navigation-title')}
      </div>
      <div>
        {children}
      </div>
    </MainLayout>
  );
};

export default RegionLayout;
