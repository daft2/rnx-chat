"use client";

import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { onAuthStateChangedListener } from "@/services/authService";

const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Only set loading false after getting auth state
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to sign-in if not authenticated
        router.replace("/sign-in");
      }
    }
  }, [user, loading, router]); // Run when user or loading state changes

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Only render the content if the user is authenticated
  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return <Slot />;
};

export default AppLayout;
