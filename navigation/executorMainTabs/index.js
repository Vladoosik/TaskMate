import { Tab } from "../../configs/authNavigationConfig";
import { ChatList, ProfileScreen, ProposalsScreen } from "../../screens";
import { chatListOption, profileOption, proposalOption } from "./config";

const ExecutorMainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Proposal"
      component={ProposalsScreen}
      options={proposalOption}
    />
    <Tab.Screen
      name="ChatExecutor"
      component={ChatList}
      options={chatListOption}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileOption}
    />
  </Tab.Navigator>
);

export default ExecutorMainTabs;
