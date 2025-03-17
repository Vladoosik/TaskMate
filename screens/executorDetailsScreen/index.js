import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { showMessage } from "react-native-flash-message";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ExecutorDetailsScreen = ({ navigation, route }) => {
  const { request } = route.params;

  const handleCloseRequest = async () => {
    try {
      await updateDoc(doc(db, "requests", request.id), {
        status: "closed",
      });
      showMessage({
        message: "Успешно",
        description: "Вы успешно закрыли запрос",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: "Произошла ошибка",
        description: "Проверьте пожключение к интернету и повторите попытку",
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: request.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{request.category}</Text>
          <Text style={styles.description}>{request.description}</Text>
          <Text style={styles.executor}>
            Исполнитель: {request.executor.name}
          </Text>

          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Комментарий (необязательно)"
            value={request.executor.comment}
            multiline
          />

          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Время выполнения (часы/дни)"
            value={request?.timeToWork}
            keyboardType="numeric"
          />

          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Цена ($)"
            value={request.price}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleCloseRequest}>
            <Text style={styles.buttonText}>Закрыть предложение</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExecutorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 16,
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  executor: {
    fontSize: 13,
    color: "#1f1f1f",
    marginVertical: 10,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
