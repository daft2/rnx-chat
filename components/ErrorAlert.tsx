import { View, Text, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <View className="bg-red-100 border border-red-400 rounded-lg px-4 py-3 mb-4 flex-row items-center justify-between">
      <Text className="text-red-800 flex-1 mr-2">{message}</Text>
      <TouchableOpacity onPress={onDismiss} className="p-1">
        <X size={16} color="#991B1B" />
      </TouchableOpacity>
    </View>
  );
}
