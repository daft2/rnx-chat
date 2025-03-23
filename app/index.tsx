import { Redirect } from "expo-router";
import { getCurrentUser } from "@/services/authService";

export default function Index() {
  const user = getCurrentUser();

  // If user is logged in, redirect to home, otherwise to sign-in
  return user ? (
    <Redirect href="/(root)/(tabs)" />
  ) : (
    <Redirect href="/sign-in" />
  );
}
