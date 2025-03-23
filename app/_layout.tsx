import { Stack, useRouter } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent gesture-based navigation between auth and protected routes
      }}
    />
  );
}
