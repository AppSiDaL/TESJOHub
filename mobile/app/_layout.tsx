import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import LoginScreen from "./login";
import { QueryClient, QueryClientProvider } from "react-query";
import postsService from "@/services/postsService";
import userService from "@/services/userService";
import likeService from "@/services/likeService";
import commentService from "@/services/commentService";
import friendService from "@/services/friendService";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native";
import { ThemedButton } from "@/components/ThemedButton";
import { AuthContext } from "@/hooks/AuthContext";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = new QueryClient();
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      const expiresIn = await AsyncStorage.getItem("expiresIn");
      postsService.setToken(token as string);
      userService.setToken(token as string);
      likeService.setToken(token as string);
      commentService.setToken(token as string);
      friendService.setToken(token as string);
      if (token && expiresIn) {
        setIsLoggedIn(true);
        const expiresDate = new Date(expiresIn);
        const delay = expiresDate.getTime() - Date.now();
        setTimeout(() => AsyncStorage.removeItem("token"), delay);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    navigation.navigate('login' as never);
  }

  if (!loaded) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogout: logout, onLogin: () => setIsLoggedIn(true) }}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="[user]"
            options={{
              headerBackTitle: "Back",
              title: "",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown:false,
              headerBackTitle: "Back",
              title: "",
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
    </AuthContext.Provider>
  );
}
