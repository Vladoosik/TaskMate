import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { authStore } from "../../store/authStore";
import { observer } from "mobx-react";
import { ActivityIndicator } from "react-native";
import { NotificationProvider } from "../../context/NotificationContext";
import * as Notification from "expo-notifications";
import { AuthStack, ClientStack, ExecutorStack, UserStack } from "../index";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
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
      {!authStore.userId ? (
        <AuthStack />
      ) : (
        <NotificationProvider>
          <UserStack />
        </NotificationProvider>
      )}
    </NavigationContainer>
  );
};

export default observer(AppNavigator);
