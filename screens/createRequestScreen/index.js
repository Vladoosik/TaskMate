import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Button, Card } from "react-native-paper";
import { authStore } from "../../store/authStore";
import { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";

const categories = ["Ремонт", "Клининг", "Доставка", "Электрика"];

const CreateRequestScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearStates = () => {
    setDescription("");
    setImage(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim() || !image) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "requests"), {
        userId: authStore.userId,
        description,
        category,
        image,
        price: null,
        executor: {
          id: null,
          name: null,
        },
        mark: null,
        status: "open",
        createdAt: serverTimestamp(),
      });
      showMessage({
        message: "Заявка успешно создана",
        duration: 2000,
        description: "Вы можете помотреть свои активные заявки впрофиле",
        type: "success",
      });
      clearStates();
      navigation.navigate("Profile");
    } catch (error) {
      showMessage({
        duration: 2000,
        message: "Что то пошло не так",
        description: "Проверьте подключение к интернету",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Создать заявку</Text>

        <Card style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Выбрать фото/видео</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </Card>

        <Text style={styles.label}>Категория:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          items={categories.map((cat) => ({ label: cat, value: cat }))}
        >
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Описание проблемы"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Опубликовать заявку
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default CreateRequestScreen;
