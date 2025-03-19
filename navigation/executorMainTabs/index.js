import { Tab } from "../../configs/authNavigationConfig";
import { ProfileScreen, ProposalsScreen } from "../../screens";
import { profileOption, proposalOption } from "./config";

const ExecutorMainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Proposal"
      component={ProposalsScreen}
      options={proposalOption}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileOption}
    />
  </Tab.Navigator>
);

export default ExecutorMainTabs;
