import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { makeAutoObservable, runInAction } from "mobx";

class ProfileStore {
  executorRating = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getRatingUser(userId) {
    runInAction(() => (this.executorRating = null));
    try {
      const q = query(
        collection(db, "requests"),
        where("status", "==", "closed"),
        where("executor.id", "==", userId),
      );
      const querySnapshot = await getDocs(q);
      const requestsList = querySnapshot.docs.map((doc) => doc.data());
      const ratedRequests = requestsList.filter((req) => req.rating);

      if (ratedRequests.length > 0) {
        const averageRating =
          ratedRequests.reduce((sum, req) => sum + req.rating, 0) /
          ratedRequests.length;
        runInAction(() => (this.executorRating = Math.round(averageRating)));
      } else {
        runInAction(() => (this.executorRating = null));
      }
    } catch (error) {
      console.error("Ошибка при загрузке рейтинга:", error);
    }
  }
}

export const profileStore = new ProfileStore();
