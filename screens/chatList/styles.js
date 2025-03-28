import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  unreadBadge: {
    backgroundColor: "blue",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  unreadText: {
    color: "white",
    fontWeight: "bold",
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    maxWidth: "90%",
  },
  authorMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});
