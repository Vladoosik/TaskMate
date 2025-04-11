import { UnrankedRequests, UserRequestsScreen } from "../../screens";
import { Stack } from "../../configs/authNavigationConfig";
import React from "react";
import { ClientMainTabs, CommonStacks } from "../index";
import {
  activeRequestOption,
  unrankedRequestOption,
} from "../appNavigator/config";

const ClientStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ClientTabs"
      component={ClientMainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ActiveClientRequests"
      component={UserRequestsScreen}
      options={activeRequestOption}
    />
    <Stack.Screen
      name="UnrankedRequests"
      component={UnrankedRequests}
      options={unrankedRequestOption}
    />
    {CommonStacks()}
  </Stack.Navigator>
);

export default ClientStack;
