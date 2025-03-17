import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { authStore } from "../../store/authStore";
import { observer } from "mobx-react";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("client");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, password]);

  const handleAuth = async () => {
    try {
      setLoading(true);
      let userCredential;

      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email,
          role,
        });
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      }

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const user = userDoc.data();
        authStore.saveUser(user);
        const userRole = user.role;
        authStore.saveUserId(userCredential.user.uid);
        await asyncStorage.setItem("uid", userCredential.user.uid);
        navigation.navigate(
          userRole === "client" ? "ClientTabs" : "ExecutorTabs",
        );
      }
    } catch (e) {
      setError(e.message);
      console.error("Authentication error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Регистрация" : "Вход"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isSignUp && (
        <View style={styles.roleContainer}>
          <TouchableOpacity onPress={() => setRole("client")}>
            <Text
              style={[
                styles.roleText,
                role === "client" && styles.selectedRole,
              ]}
            >
              Клиент
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRole("executor")}>
            <Text
              style={[
                styles.roleText,
                role === "executor" && styles.selectedRole,
              ]}
            >
              Исполнитель
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        activeOpacity={0.6}
      >
        {loading ? (
          <ActivityIndicator color={"#fff"} />
        ) : (
          <Text style={styles.buttonText}>
            {isSignUp ? "Зарегистрироваться" : "Войти"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.switchText}>
          {isSignUp
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  errorText: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  roleText: {
    fontSize: 18,
    padding: 10,
    color: "#333",
  },
  selectedRole: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default observer(AuthScreen);
