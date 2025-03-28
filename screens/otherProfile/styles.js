import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 6,
    textAlign: "center",
  },
  card: {
    width: "80%",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  avatar: {
    backgroundColor: "#6200ee",
    alignSelf: "center",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  roleText: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#d32f2f",
  },
  activeRequests: {
    marginTop: 20,
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
