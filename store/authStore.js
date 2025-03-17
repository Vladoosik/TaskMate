import { makeAutoObservable, runInAction } from "mobx";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  userId = null;

  user = null;

  saveUserId(id) {
    this.userId = id;
  }

  saveUser(user) {
    this.user = user;
  }

  async loadUserId() {
    const result = await asyncStorage.getItem("uid");
    if (result) {
      const userDoc = await getDoc(doc(db, "users", result));
      if (userDoc.exists()) {
        runInAction(() => {
          this.userId = result;
          this.user = userDoc.data();
        });
      }
    }
  }
}

export const authStore = new AuthStore();
