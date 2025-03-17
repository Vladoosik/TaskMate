import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import { authStore } from "../../store/authStore";
import { RequestCard } from "../../components";

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
        <View style={styles.emptyContainer}>
          <MaterialIcons name="info-outline" size={50} color="gray" />
          <Text style={styles.emptyText}>Нет активных заявок</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
});
