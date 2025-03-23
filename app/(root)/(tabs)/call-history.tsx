import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CallHistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-semibold text-gray-800">
          Call History Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}
