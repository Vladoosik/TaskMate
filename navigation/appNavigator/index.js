import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "../../configs/authNavigationConfig";
import {
  AuthScreen,
  ExecutorDetailsScreen,
  ExecutorRequestScreen,
  FinishedRequestScreen,
  RequestDetailsScreen,
  UnrankedRequests,
  UserRequestsScreen,
} from "../../screens";
import { ClientMainTabs, ExecutorMainTabs } from "../index";
import { useEffect, useState } from "react";
import { authStore } from "../../store/authStore";
import { observer } from "mobx-react";
import { ActivityIndicator } from "react-native";

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
                options={{ title: "Активные заявки", headerBackTitle: "Назад" }}
              />
              <Stack.Screen
                name="FinishedRequest"
                component={FinishedRequestScreen}
                options={{
                  title: "Завершенные",
                  headerBackTitle: "Назад",
                }}
              />
              <Stack.Screen
                name="UnrankedRequests"
                component={UnrankedRequests}
                options={{
                  title: "Нужны оценки",
                  headerBackTitle: "Назад",
                }}
              />
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
                options={{ title: "Детали заявки", headerBackTitle: "Назад" }}
              />
              <Stack.Screen
                name="ExecutorRequests"
                component={ExecutorRequestScreen}
                options={{ title: "Активные заявки", headerBackTitle: "Назад" }}
              />
              <Stack.Screen
                name="FinishedRequest"
                component={FinishedRequestScreen}
                options={{
                  title: "Завершенные",
                  headerBackTitle: "Назад",
                }}
              />
              <Stack.Screen
                name="ExecutorDetails"
                component={ExecutorDetailsScreen}
                options={{ title: "Детали заявки", headerBackTitle: "Назад" }}
              />
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
