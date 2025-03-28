import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "../../configs/authNavigationConfig";
import {
  AuthScreen,
  ChatScreen,
  ExecutorDetailsScreen,
  ExecutorRequestScreen,
  FinishedRequestScreen,
  OtherProfile,
  RequestDetailsScreen,
  UnrankedRequests,
  UserRequestsScreen,
} from "../../screens";
import { ClientMainTabs, ExecutorMainTabs } from "../index";
import { useEffect, useState } from "react";
import { authStore } from "../../store/authStore";
import { observer } from "mobx-react";
import { ActivityIndicator } from "react-native";
import {
  activeRequestOption,
  ChatOption,
  finishedRequestOption,
  OtherProfileOptions,
  requestDetailsOption,
  unrankedRequestOption,
} from "./config";

const AppNavigator = () => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      await authStore.loadUserId();
      setChecked(true);
    };
    loadUser();
  }, []);

  if (!checked) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const commonStacks = [
    <Stack.Screen
      name="FinishedRequest"
      component={FinishedRequestScreen}
      options={finishedRequestOption}
    />,
    <Stack.Screen
      name="OtherProfile"
      component={OtherProfile}
      options={OtherProfileOptions}
    />,
    <Stack.Screen name="Chat" component={ChatScreen} options={ChatOption} />,
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authStore.userId ? (
          authStore.user.role === "client" ? (
            <>
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
              {commonStacks}
            </>
          ) : (
            <>
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
              {commonStacks}
            </>
          )
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(AppNavigator);
