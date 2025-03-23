"use client";

import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { onAuthStateChangedListener } from "@/services/authService";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    if (!loading && user) {
      // If user is already logged in, redirect to home
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return <Slot />;
}
