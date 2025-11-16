import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PhotoProvider } from "../contexts/PhotoContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const currentRoute = segments[0];

    // Only navigate if we have segments (router is ready)
    if (segments.length === 0) return;

    if (!isAuthenticated) {
      // Only redirect if not already on a public route
      if (currentRoute !== "welcome" && currentRoute !== "login") {
        router.replace("/welcome");
      }
    } else {
      // If authenticated and on welcome/login, go to home
      if (currentRoute === "welcome" || currentRoute === "login") {
        router.replace("/home");
      }
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
      <Stack.Screen name="index" />
      <Stack.Screen name="result" />
      <Stack.Screen name="instructions" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="history" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <PhotoProvider>
        <RootLayoutNav />
      </PhotoProvider>
    </AuthProvider>
  );
}
