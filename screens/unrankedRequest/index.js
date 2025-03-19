import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Rating } from "react-native-ratings";
import { showMessage } from "react-native-flash-message";
import { db } from "../../firebase-config";
import { authStore } from "../../store/authStore";
import { EmptyList } from "../../components";
import { styles } from "./styles";

const UnrankedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFinishedRequests = async () => {
      try {
        const q = query(
          collection(db, "requests"),
          where("status", "==", "closed"),
          where("userId", "==", authStore.userId),
        );
        const querySnapshot = await getDocs(q);
        let requestsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Оставляем только заявки без оценки
        requestsList = requestsList.filter((request) => !request.rating);
        setRequests(requestsList);
      } catch (error) {
        console.error("Ошибка при загрузке заявок:", error);
      } finally {
        setLoading(false);
      }
    };

    getFinishedRequests();
  }, []);

  const handleRatingSubmit = async (id, rating) => {
    try {
      await updateDoc(doc(db, "requests", id), { rating });

      showMessage({
        message: "Оценка отправлена!",
        description: `Вы поставили ${rating} ⭐`,
        type: "success",
      });
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== id),
      );
    } catch (error) {
      console.error("Ошибка при отправке оценки:", error);
      showMessage({
        message: "Ошибка",
        description: "Не удалось отправить оценку",
        type: "danger",
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {requests.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.photo && (
                <Image source={{ uri: item.photo }} style={styles.image} />
              )}
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.category}</Text>
                <Text style={styles.text}>
                  Исполнитель: {item.executor?.name || "Неизвестно"}
                </Text>
                <Text style={styles.text}>
                  Цена: {item.price || "Договорная"}
                </Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={30}
                  jumpValue={1}
                  showRating
                  onFinishRating={(rating) =>
                    handleRatingSubmit(item.id, rating)
                  }
                  style={{ marginTop: 10 }}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default UnrankedRequests;
