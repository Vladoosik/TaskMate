import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import { RequestCard } from "../../components";
import { authStore } from "../../store/authStore";

const ExecutorRequestScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(
      collection(db, "requests"),
      where("status", "==", "onProgress"),
      where("executor.id", "==", authStore.userId),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requestsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(requestsList);
      setLoading(false);
    });

    return () => unsubscribe(); // Отписка при размонтировании
  }, []);

  const handleDetailsNavigate = (item) => {
    navigation.navigate("ExecutorDetails", {
      request: item,
    });
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
          <MaterialIcons name="info-outline" size={50} color="gray" />
          <Text style={styles.emptyText}>Нет активных заявок</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RequestCard
              item={item}
              onCardPress={() => handleDetailsNavigate(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ExecutorRequestScreen;

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
