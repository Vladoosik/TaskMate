import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
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
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Нет заявок без оценки</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
