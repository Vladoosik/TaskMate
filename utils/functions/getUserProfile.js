import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export const getUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.data();
};
