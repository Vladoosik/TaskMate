import React, { useEffect } from "react";
import { authStore } from "../../store/authStore";
import { ClientStack, ExecutorStack } from "../index";
import { useNotification } from "../../context/NotificationContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const UserStack = () => {
  const { expoPushToken } = useNotification();

  useEffect(() => {
    const saveTokenToFirestore = async () => {
      if (!authStore.userId || !expoPushToken) return;

      const userRef = doc(db, "users", authStore.userId);
      const userSnap = await getDoc(userRef);
      const existingToken = userSnap.data()?.pushToken;

      if (existingToken !== expoPushToken) {
        await updateDoc(userRef, { pushToken: expoPushToken });
        console.log("✅ Push token saved to Firestore");
      }
    };

    saveTokenToFirestore();
  }, [expoPushToken]);
  return (
    <>
      {authStore.user.role === "client" ? <ClientStack /> : <ExecutorStack />}
    </>
  );
};

export default UserStack;
