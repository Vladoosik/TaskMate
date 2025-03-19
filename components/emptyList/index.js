import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./styles";

const EmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="info-outline" size={50} color="gray" />
      <Text style={styles.emptyText}>Нет заявок</Text>
    </View>
  );
};

export default EmptyList;
