import { Stack } from "../../configs/authNavigationConfig";
import { CommonStacks, ExecutorMainTabs } from "../index";
import {
  activeRequestOption,
  requestDetailsOption,
} from "../appNavigator/config";
import {
  ExecutorDetailsScreen,
  ExecutorRequestScreen,
  RequestDetailsScreen,
} from "../../screens";

const ExecutorStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ExecutorTabs"
      component={ExecutorMainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RequestDetails"
      component={RequestDetailsScreen}
      options={requestDetailsOption}
    />
    <Stack.Screen
      name="ExecutorRequests"
      component={ExecutorRequestScreen}
      options={activeRequestOption}
    />
    <Stack.Screen
      name="ExecutorDetails"
      component={ExecutorDetailsScreen}
      options={requestDetailsOption}
    />
    {CommonStacks()}
  </Stack.Navigator>
);

export default ExecutorStack;
