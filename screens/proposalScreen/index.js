import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { collection, query, where } from "firebase/firestore";
import { EmptyList, RequestCard } from "../../components";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { styles } from "./styles";
const ProposalsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(db, "requests"), where("status", "==", "open"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requestsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(requestsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDetailsNavigate = (item) => {
    navigation.navigate("RequestDetails", {
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
        <EmptyList />
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

export default ProposalsScreen;
