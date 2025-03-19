import { Tab } from "../../configs/authNavigationConfig";
import { CreateRequestScreen, ProfileScreen } from "../../screens";
import { createRequestOption, profileOption } from "./config";
const ClientMainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="CreateRequest"
      component={CreateRequestScreen}
      options={createRequestOption}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileOption}
    />
  </Tab.Navigator>
);

export default ClientMainTabs;
