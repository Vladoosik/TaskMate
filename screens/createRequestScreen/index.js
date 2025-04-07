import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { Button, Card } from "react-native-paper";
import { authStore } from "../../store/authStore";
import { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

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
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(
        storage,
        `requests/${Date.now()}_${authStore.userId}.jpg`,
      );
      await uploadBytes(imageRef, blob);

      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "requests"), {
        userId: authStore.userId,
        description,
        category,
        image: imageUrl,
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
export default CreateRequestScreen;
