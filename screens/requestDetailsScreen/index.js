import React, { useState } from "react";
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
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { authStore } from "../../store/authStore";
import { showMessage } from "react-native-flash-message";

const RequestDetailsScreen = ({ navigation, route }) => {
  const { request } = route.params;

  const [comment, setComment] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [price, setPrice] = useState("");

  const handleApply = async () => {
    try {
      await updateDoc(doc(db, "requests", request.id), {
        status: "onProgress",
        price: price,
        timeToWork: completionTime,
        executor: {
          id: authStore.userId,
          name: authStore.user.email,
          comment,
        },
      });
      showMessage({
        message: "Успешно",
        description: "Вы успешно открикнулись на запрос",
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

          <TextInput
            style={styles.input}
            placeholder="Комментарий (необязательно)"
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Время выполнения (часы/дни)"
            value={completionTime}
            onChangeText={setCompletionTime}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Цена ($)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleApply}>
            <Text style={styles.buttonText}>Откликнуться</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestDetailsScreen;

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
    marginVertical: 10,
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
