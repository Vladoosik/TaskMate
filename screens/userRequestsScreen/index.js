import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { authStore } from "../../store/authStore";
import { EmptyList, RequestCard } from "../../components";
import { styles } from "./styles";

const UserRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActiveRequests = async () => {
      try {
        const q = query(
          collection(db, "requests"),
          where("status", "==", "open"),
          where("userId", "==", authStore.userId),
        );
        const querySnapshot = await getDocs(q);
        const requestsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(requestsList);
      } catch (error) {
        console.error("Ошибка при загрузке заявок:", error);
      } finally {
        setLoading(false);
      }
    };

    getActiveRequests();
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

export default UserRequestsScreen;
