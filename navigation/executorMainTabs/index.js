import { Tab } from "../../configs/authNavigationConfig";
import { ProfileScreen, ProposalsScreen } from "../../screens";

const ExecutorMainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Proposal" component={ProposalsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default ExecutorMainTabs;
