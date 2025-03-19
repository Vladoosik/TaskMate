import React from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { observer } from "mobx-react";
import asyncStorage from "@react-native-async-storage/async-storage";
import { authStore } from "../../store/authStore";
import { styles } from "./styles";

const ProfileScreen = observer(({ navigation }) => {
  const isExecutor = authStore?.user?.role === "executor";
  const handleLogout = async () => {
    Alert.alert("Выход", "Вы действительно хотите выйти?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Выйти",
        onPress: async () => {
          await asyncStorage.removeItem("uid");
          authStore.userId = null;
          authStore.user = null;
        },
      },
    ]);
  };

  const handleRequestNav = () => {
    if (isExecutor) {
      navigation.navigate("ExecutorRequests");
    } else {
      navigation.navigate("ActiveClientRequests");
    }
  };

  const handleFinishedRequestNav = () => {
    navigation.navigate("FinishedRequest");
  };

  const handleUnrankedRequestNav = () => {
    navigation.navigate("UnrankedRequests");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Avatar.Text
          size={80}
          label={authStore.user.email.charAt(0).toUpperCase()}
          style={styles.avatar}
        />
        <Text style={styles.email}>{authStore.user.email}</Text>
        <Text style={styles.role}>
          Роль: <Text style={styles.roleText}>{authStore.user.role}</Text>
        </Text>
        <Button
          mode="outlined"
          onPress={handleRequestNav}
          style={styles.activeRequests}
        >
          Активные заявки
        </Button>
        {!isExecutor && (
          <Button
            mode="outlined"
            onPress={handleUnrankedRequestNav}
            style={styles.activeRequests}
          >
            Требуют оценки
          </Button>
        )}
        <Button
          mode="outlined"
          onPress={handleFinishedRequestNav}
          style={styles.activeRequests}
        >
          Завершенные завки
        </Button>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Выйти
        </Button>
      </Card>
    </SafeAreaView>
  );
});

export default ProfileScreen;
