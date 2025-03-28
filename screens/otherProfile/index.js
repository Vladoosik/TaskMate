import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { styles } from "./styles";
import { observer } from "mobx-react";
import { profileStore } from "../../store/profileStore";
import { FontAwesome } from "@expo/vector-icons";
import { getUserProfile } from "../../utils/functions/getUserProfile";

const OtherProfile = observer(({ navigation, route }) => {
  const { userId } = route.params;
  const [userProfile, setUserProfile] = useState(null);

  const isExecutor = userProfile?.role === "executor";
  const textRole = isExecutor ? "Исполнитель" : "Клиент";

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUserProfile(userId);
      setUserProfile(userData);
      if (userData.role === "executor") {
        await profileStore.getRatingUser(userId);
      }
    };

    getUserData();
  }, []);

  const handleChatNavigate = () => {
    navigation.navigate("Chat", {
      userId,
    });
  };

  if (!userProfile) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Avatar.Text
          size={80}
          label={userProfile?.email?.charAt(0).toUpperCase()}
          style={styles.avatar}
        />
        <Text style={styles.email}>{userProfile?.email}</Text>
        <Text style={styles.role}>
          Роль: <Text style={styles.roleText}>{textRole}</Text>
        </Text>
        {isExecutor && profileStore.executorRating !== null && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              Рейтинг: {profileStore.executorRating || 0}
            </Text>
            <FontAwesome name="star" size={16} color="#FFD700" />
          </View>
        )}
        <Button
          mode="outlined"
          style={styles.activeRequests}
          onPress={handleChatNavigate}
        >
          Написать сообщение
        </Button>
      </Card>
    </SafeAreaView>
  );
});

export default OtherProfile;
