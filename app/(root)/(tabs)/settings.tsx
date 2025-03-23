"use client";

import type React from "react";

import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { useState } from "react";
import LogoutConfirmationModal from "../../../components/LogoutConfirmationModal";
import { logout } from "@/services/authService";

// Mock function to get user data - in a real app, this would come from your auth service
const getUserData = () => {
  return {
    name: "Alex",
    email: "alex@example.com",
    // Other user data would go here
  };
};

export default function SettingsScreen() {
  const user = getUserData();
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

  const handleLogoutPress = () => {
    setLogoutConfirmVisible(true);
  };

  const handleLogoutConfirm = () => {
    // In a real app, this would call your logout function
    logout();
    setLogoutConfirmVisible(false);
    // Logout logic would go here
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-800">Settings</Text>
        </View>

        {/* Profile Section */}
        <View className="px-4 py-4">
          <TouchableOpacity className="flex-row items-center bg-gray-50 p-4 rounded-xl">
            <View className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center mr-4">
              <Text className="text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                {user.name}
              </Text>
              <Text className="text-gray-600">{user.email}</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        <View className="px-4 py-2">
          <Text className="text-sm font-medium text-gray-500 mb-2 uppercase">
            Preferences
          </Text>

          <View className="bg-gray-50 rounded-xl overflow-hidden">
            <SettingsItem
              icon={<Bell size={20} color="#4b5563" />}
              title="Notifications"
            />
            <SettingsItem
              icon={<Shield size={20} color="#4b5563" />}
              title="Privacy & Security"
            />
          </View>
        </View>

        <View className="px-4 py-2">
          <Text className="text-sm font-medium text-gray-500 mb-2 uppercase">
            Support
          </Text>

          <View className="bg-gray-50 rounded-xl overflow-hidden">
            <SettingsItem
              icon={<HelpCircle size={20} color="#4b5563" />}
              title="Help Center"
            />
            <SettingsItem
              icon={<Info size={20} color="#4b5563" />}
              title="About"
            />
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-4 py-6">
          <TouchableOpacity
            className="flex-row items-center justify-center py-4 bg-red-50 rounded-xl"
            onPress={handleLogoutPress}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-600 font-medium ml-2">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        visible={logoutConfirmVisible}
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </SafeAreaView>
  );
}

function SettingsItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
      {icon}
      <Text className="text-gray-800 ml-3 flex-1">{title}</Text>
      <ChevronRight size={18} color="#9ca3af" />
    </TouchableOpacity>
  );
}
