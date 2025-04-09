import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-config";
import { showMessage } from "react-native-flash-message";

export const uploadImageAsync = async (uri, folder = "uploads") => {
  try {
    const filename = `${folder}/${Date.now()}_${uri.split("/").pop()}`;
    const storageRef = ref(storage, filename);

    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    return getDownloadURL(storageRef);
  } catch (error) {
    showMessage({
      duration: 2000,
      message: "Ошибка при загрузке файла",
      description: "Проверьте подключение к интернету",
      type: "danger",
    });
  }
};
