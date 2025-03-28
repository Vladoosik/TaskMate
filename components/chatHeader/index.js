import React, { memo, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

const ChatHeader = ({ userData, navigation }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const avatarColor = useMemo(() => getRandomColor(), []);
  const firstLetter = userData?.email?.charAt(0).toUpperCase();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.userInfoContainer}>
        <Avatar.Text
          size={40}
          label={firstLetter}
          color="white"
          style={{ backgroundColor: avatarColor }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.emailText}>{userData?.email}</Text>
          <Text style={styles.roleText}>{userData?.role}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ChatHeader);
