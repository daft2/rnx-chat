import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import { AlertTriangle } from "lucide-react-native";

interface LogoutConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmationModal({
  visible,
  onCancel,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <Pressable className="flex h-full" onPress={onCancel}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="flex h-full bg-black/50 justify-center items-center px-4"
        >
          <View className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
            <View className="items-center mb-4">
              <View className="bg-red-100 p-3 rounded-full mb-2">
                <AlertTriangle size={28} color="#ef4444" />
              </View>
              <Text className="text-xl font-bold text-gray-800">
                Logout Confirmation
              </Text>
            </View>

            <Text className="text-gray-600 text-center mb-6">
              Are you sure you want to log out of your account?
            </Text>

            <View className="flex-row gap-4">
              <TouchableOpacity
                className="flex-1 py-3 bg-gray-100 rounded-xl items-center"
                onPress={onCancel}
              >
                <Text className="font-medium text-gray-700">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-3 bg-red-500 rounded-xl items-center"
                onPress={onConfirm}
              >
                <Text className="font-medium text-white">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
