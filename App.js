import { StyleSheet } from "react-native";
import { AppNavigator } from "./navigation";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <>
      <AppNavigator />
      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
