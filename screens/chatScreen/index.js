import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { orderBy } from "firebase/firestore";
import { getUserProfile } from "../../utils/functions/getUserProfile";
import { ChatHeader } from "../../components";
import { Chat } from "@flyerhq/react-native-chat-ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authStore } from "../../store/authStore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const ChatScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const insets = useSafeAreaInsets();

  const currentUserId = authStore.userId;
  const user = {
    id: currentUserId,
  };
  const chatId = [currentUserId, userId].sort().join("_");

  const markMessagesAsRead = async (snapshot) => {
    if (!snapshot) return;

    const chatRef = doc(db, "chats", chatId);

    await updateDoc(chatRef, {
      [`unreadCount.${currentUserId}`]: 0,
    });

    const unreadMessages = snapshot.docs.filter(
      (doc) =>
        doc.data().status !== "seen" && doc.data().author.id !== currentUserId,
    );

    unreadMessages.forEach(async (msg) => {
      await updateDoc(doc(db, "chats", chatId, "messages", msg.id), {
        status: "seen",
      });
    });
  };

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);

      markMessagesAsRead(snapshot);
    });

    return () => unsubscribe();
  }, []);

  const handleSendPress = async (message) => {
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    const textMessage = {
      author: {
        id: currentUserId,
      },
      createdAt: Date.now(),
      text: message.text,
      name: authStore.user.email,
      type: "text",
      status: "sent",
    };

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [currentUserId, userId],
        createdAt: Date.now(),
        lastMessage: textMessage,
        unreadCount: { [userId]: 1, [currentUserId]: 0 },
      });
    } else {
      await updateDoc(chatRef, {
        lastMessage: textMessage,
        [`unreadCount.${userId}`]: increment(1),
      });
    }

    await addDoc(collection(db, "chats", chatId, "messages"), textMessage);
  };

  useEffect(() => {
    getUserProfile(userId).then((res) => setUserData(res));
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ChatHeader userData={userData} navigation={navigation} />
      <Chat messages={messages} onSendPress={handleSendPress} user={user} />
    </View>
  );
};

export default ChatScreen;
