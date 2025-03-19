import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { authStore } from "../../store/authStore";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { EmptyList, RequestCard } from "../../components";
import { styles } from "./styles";

const FinishedRequestScreen = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFinishedRequests = async () => {
      try {
        let q;
        if (authStore.user.role === "executor") {
          q = await query(
            collection(db, "requests"),
            where("status", "==", "closed"),
            where("executor.id", "==", authStore.userId),
          );
        } else {
          q = await query(
            collection(db, "requests"),
            where("status", "==", "closed"),
            where("userId", "==", authStore.userId),
          );
        }
        const querySnapshot = await getDocs(q);
        let requestsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (authStore.user.role === "client") {
          requestsList = requestsList.filter((request) => request.rating);
        }

        setRequests(requestsList);
      } catch (error) {
        console.error("Ошибка при загрузке заявок:", error);
      } finally {
        setLoading(false);
      }
    };

    getFinishedRequests();
  }, []);

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
          renderItem={({ item }) => <RequestCard item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default FinishedRequestScreen;
