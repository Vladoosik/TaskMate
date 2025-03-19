import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { showMessage } from "react-native-flash-message";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

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
