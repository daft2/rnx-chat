import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const HomeScreen = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="pb-32 px-8 flex h-full">
        <View className="flex items-center justify-center h-full gap-4">
          <Text className="text-xl font-bold text-black">Home Screen</Text>
          <Link href="/profile">Profile</Link>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/chat/1">Chat 1</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
