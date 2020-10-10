// import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
// import { useTranslation } from 'react-i18next';

import RegionLayout from '../layouts/RegionLayout/RegionLayout';

// const useStyles = makeStyles(
//   () => ({
//     root: {},
//   })
// );

const Businesses = (): ReactElement => {
  // const { t } = useTranslation('common');
  // const classes = useStyles();

  return (
    <RegionLayout title="Edit Businesses">
      Business Page
    </RegionLayout>
  );
};

export default Businesses;
