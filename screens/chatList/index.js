import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, onSnapshot, query } from "firebase/firestore";
import { format } from "date-fns";
import { db } from "../../firebase-config";
import { authStore } from "../../store/authStore";
import { ru } from "date-fns/locale";
import { styles } from "./styles";

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = authStore.userId;

  useEffect(() => {
    const q = query(collection(db, "chats"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((chat) => chat.id.includes(currentUserId));

      setChats(chatList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChatPress = (userId) => {
    navigation.navigate("Chat", {
      userId,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : chats.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Чатов пока нет
        </Text>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const otherUserId = item.participants.find(
              (id) => id !== currentUserId,
            );
            const lastMessage = item.lastMessage?.text || "Нет сообщений";
            const unreadCount = item.unreadCount?.[currentUserId] || 0;
            const lastMessageTime = item.lastMessage?.createdAt
              ? format(new Date(item.lastMessage.createdAt), "dd MMM, HH:mm", {
                  locale: ru,
                })
              : "";
            const authorLastMessage =
              item.lastMessage?.author.id === currentUserId
                ? "Вы"
                : item.lastMessage?.name;

            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => handleChatPress(otherUserId)}
              >
                <Avatar.Text
                  size={48}
                  label={item.lastMessage?.name?.charAt(0).toUpperCase() || "?"}
                  style={{ backgroundColor: "#007AFF", marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.authorMessage}>{authorLastMessage}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMessage}
                  </Text>
                </View>
                {unreadCount > 0 ? (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{unreadCount}</Text>
                  </View>
                ) : (
                  <Text style={styles.messageTime}>{lastMessageTime}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default ChatList;
