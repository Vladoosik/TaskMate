import { Tab } from "../../configs/authNavigationConfig";
import { ChatList, CreateRequestScreen, ProfileScreen } from "../../screens";
import { chatListOption, createRequestOption, profileOption } from "./config";
const ClientMainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="CreateRequest"
      component={CreateRequestScreen}
      options={createRequestOption}
    />
    <Tab.Screen
      name="ChatClient"
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

export default ClientMainTabs;
