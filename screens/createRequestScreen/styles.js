import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    padding: 15,
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
  },
});
