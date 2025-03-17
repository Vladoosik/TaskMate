import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const RequestCard = ({ item, onCardPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onCardPress}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
