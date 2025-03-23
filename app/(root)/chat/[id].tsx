import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Room id {id}</Text>
    </View>
  );
};

export default ChatScreen;
