import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { TheirWord } from '../TheirWord';
import { YourWord } from '../YourWord';

const propTypes = {
  /** The max length of the Actual Word. */
  actualWordLength: PropTypes.number.isRequired,
};

type props = PropTypes.InferProps<typeof propTypes>;

const getTabId = (panel: string) => `tab-${panel}`;
const getTabPanelId = (panel: string) => `tabpanel-${panel}`;
const tabProps = (label: string) => ({
  label,
  'id': getTabId(label.toLowerCase().replace(' ', '-')),
  'aria-controls': getTabPanelId(label.toLowerCase().replace(' ', '-')),
});
const tabPanelProps = (label: string) => ({
  'role': 'tabpanel',
  'id': getTabPanelId(label.toLowerCase().replace(' ', '-')),
  'aria-labelledby': getTabId(label.toLowerCase().replace(' ', '-')),
});

/**
 * <TabPanels /> displays the tabs and the panels to navigate between <YourWord /> and <TheirWord />.
 *
 * @returns {object} - I don't know yet.
 */
const TabPanels: React.FC<props> = ({ actualWordLength }) => {
  const [tabValue, setTabValue] = React.useState(0);
  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={(event: React.ChangeEvent<{}>, newValue: number) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab {...tabProps('Your Word')} />
          <Tab {...tabProps('Their Word')} />
        </Tabs>
      </AppBar>
      <SwipeableViews enableMouseEvents index={tabValue} onChangeIndex={(index: number) => setTabValue(index)}>
        <section hidden={tabValue !== 0} {...tabPanelProps('Your Word')}>
          <YourWord actualWordLength={actualWordLength} />
        </section>
        <section hidden={tabValue !== 1} {...tabPanelProps('Their Word')}>
          <TheirWord actualWordLength={actualWordLength} />
        </section>
      </SwipeableViews>
    </>
  );
};

TabPanels.propTypes = propTypes;

export { TabPanels };
