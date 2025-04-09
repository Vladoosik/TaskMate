import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getUserProfile } from "../../utils/functions/getUserProfile";
import { ChatHeader } from "../../components";
import { Chat } from "@flyerhq/react-native-chat-ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authStore } from "../../store/authStore";
import { db } from "../../firebase-config";
import * as ImagePicker from "expo-image-picker";
import { uploadImageAsync } from "../../utils/functions/uploadImage";

const ChatScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const insets = useSafeAreaInsets();

  const currentUserId = authStore.userId;
  const user = {
    id: currentUserId,
    name: authStore.user.email,
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

  const sendMessage = async (messageData) => {
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    // Добавляем сообщение в Firestore
    const messageRef = await addDoc(
      collection(db, "chats", chatId, "messages"),
      messageData,
    );

    // Обновляем чат
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [currentUserId, userId],
        createdAt: Date.now(),
        lastMessage: messageData,
        unreadCount: { [userId]: 1, [currentUserId]: 0 },
      });
    } else {
      await updateDoc(chatRef, {
        lastMessage: messageData,
        [`unreadCount.${userId}`]: increment(1),
      });
    }

    return messageRef;
  };

  const handleSendPress = async (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      text: message.text,
      name: authStore.user.email,
      type: "text",
      status: "sent",
    };

    await sendMessage(textMessage);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const media = result.assets[0];

      const imageMessage = {
        author: user,
        createdAt: Date.now(),
        height: media.height,
        text: "Вложение",
        name: media.fileName ?? media.uri?.split("/").pop() ?? "🖼",
        size: media.fileSize ?? 0,
        type: "image",
        uri: media.uri,
        status: "sending",
        width: media.width,
      };

      const messageRef = await sendMessage(imageMessage);

      const downloadURL = await uploadImageAsync(media.uri, "chatImages");

      await updateDoc(messageRef, {
        uri: downloadURL,
        status: "sent",
      });

      await updateDoc(doc(db, "chats", chatId), {
        lastMessage: {
          ...imageMessage,
          uri: downloadURL,
          status: "sent",
        },
      });
    }
  };

  useEffect(() => {
    getUserProfile(userId).then((res) => setUserData(res));
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ChatHeader userData={userData} navigation={navigation} />
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        onAttachmentPress={pickImage}
        showUserNames
        user={user}
      />
    </View>
  );
};

export default ChatScreen;
