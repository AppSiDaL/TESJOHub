import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedInputText } from "@/components/ThemedInputText";
import { ThemedButton } from "@/components/ThemedButton";
import { createLogin } from "@/services/loginService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import postsService from "@/services/postsService";
interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const data = await createLogin({ username, password });
      postsService.setToken((data.token as string))
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("expiresIn", data.expiresIn);
      onLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getToken();
  }, [])
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <Image
        source={require("@/assets/images/tesjohub-logo.png")}
        style={styles.tesjoHubLogo}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TESJOHub</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle">Usuario</ThemedText>
        <ThemedInputText
          placeholder="Usuario"
          value={username}
          onChangeText={(e) => setUsername(e)}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle">Contraseña</ThemedText>
        <ThemedInputText
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => setPassword(e)}
          placeholder="Contraseña"
        />
      </ThemedView>
      <ThemedView style={styles.button}>
        <ThemedButton type="subtitle" onPress={() => login()}>
          Iniciar Sesión
        </ThemedButton>
        <ThemedButton>¿Aún no tienes cuenta?</ThemedButton>
        <ThemedText>¿Olvidaste tu contraseña?</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  tesjoHubLogo: {
    alignSelf: "center",
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
  },
  button: {
    alignItems: "center",
  },
});
