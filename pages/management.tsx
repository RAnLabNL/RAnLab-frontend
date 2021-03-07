import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TabPanel from '../components/base/TabPanel';
import AdminLayout from '../components/layout/admin-layout/AdminLayout';
import AddBusiness from '../components/modules/management/AddBusiness';
import AddRegion from '../components/modules/management/AddRegion';
import SetManager from '../components/modules/management/SetManager';


const useStyles = makeStyles(
  (theme) => ({
    root: {},
    tabs: {
      marginBottom: theme.spacing(2),
    },
  })
);

const management = (): ReactElement => {
  const { t } = useTranslation('pages');
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(1);
  const tabId = 'management-tabpanel';

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const a11yProps = (index: number) => {
    return {
      id: `management-tab-${index}`,
      'aria-controls': `${tabId}-${index}`,
    };
  };

  return (
    <AdminLayout>
      <Tabs
        className={classes.tabs}
        value={tabIndex}
        onChange={handleChange}
        aria-label={t('management-tabs-label')}
        centered
      >
        <Tab label={t('management-add-region')} {...a11yProps(0)} />
        <Tab label={t('management-add-business')} {...a11yProps(1)} />
        <Tab label={t('management-set-manager')} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={tabIndex} index={0} id={tabId}>
        <AddRegion />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} id={tabId}>
        <AddBusiness />
      </TabPanel>
      <TabPanel value={tabIndex} index={2} id={tabId}>
        <SetManager />
      </TabPanel>
    </AdminLayout>
  );
};

export default management;
