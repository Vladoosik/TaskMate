import { Tab } from "../../configs/authNavigationConfig";
import { CreateRequestScreen, ProfileScreen } from "../../screens";
const ClientMainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="CreateRequest" component={CreateRequestScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default ClientMainTabs;
