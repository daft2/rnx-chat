"use client";

import type React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowRight,
  Bell,
  Star,
  Users,
  Video,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronRight,
  X,
  AlertTriangle,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import type { User } from "firebase/auth";

// Mock function to get user data - in a real app, this would come from your auth service
const getUserData = () => {
  return {
    name: "Alex",
    email: "alex@example.com",
    // Other user data would go here
  };
};

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState("");
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

  useEffect(() => {
    // Get user data
    setUser(getCurrentUser());

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogoutPress = () => {
    // Close the profile menu first, then show the confirmation
    setProfileMenuVisible(false);
    // Use a small timeout to ensure the first modal is closed before opening the second
    setTimeout(() => {
      setLogoutConfirmVisible(true);
    }, 300);
  };

  const handleLogoutConfirm = () => {
    // In a real app, this would call your logout function
    setLogoutConfirmVisible(false);
    // Logout logic would go here
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmVisible(false);
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
          <View>
            <Text className="text-lg text-gray-600">{greeting}</Text>
            <Text className="text-2xl font-bold text-gray-800">
              {user.displayName}
            </Text>
          </View>
          <View className="flex-row space-x-2 gap-4">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
              <Bell size={22} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 bg-gray-100 rounded-full"
              onPress={() => setProfileMenuVisible(true)}
            >
              <UserIcon size={22} color="#4b5563" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 py-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <QuickActionButton
              icon={<Users size={24} color="#3b82f6" />}
              label="New Group"
            />
            <QuickActionButton
              icon={<Video size={24} color="#3b82f6" />}
              label="Video Call"
            />
            <QuickActionButton
              icon={<Star size={24} color="#3b82f6" />}
              label="Favorites"
            />
          </View>
        </View>

        {/* Suggestions */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              Suggestions for You
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">See All</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4 gap-4">
            <SuggestionCard
              title="Complete Your Profile"
              description="Add a profile picture and update your information"
              progress={70}
            />
            <SuggestionCard
              title="Try Video Calling"
              description="Connect face-to-face with your contacts"
              progress={0}
            />
            <SuggestionCard
              title="Add Contacts"
              description="Import contacts from your phone"
              progress={30}
            />
          </View>
        </View>

        {/* Recent Contacts */}
        <View className="px-4 py-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Recent Contacts
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <ContactBubble key={i} name={`Contact ${i}`} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Profile Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileMenuVisible}
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setProfileMenuVisible(false)}
        >
          <View className="flex-1 justify-end">
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View className="bg-white rounded-t-3xl p-5">
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-xl font-bold text-gray-800">
                    Profile
                  </Text>
                  <TouchableOpacity
                    onPress={() => setProfileMenuVisible(false)}
                    className="p-2"
                  >
                    <X size={20} color="#4b5563" />
                  </TouchableOpacity>
                </View>

                {/* User Info */}
                <View className="flex-row items-center mb-6">
                  <View className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center mr-4">
                    <Text className="text-white text-xl font-bold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-lg font-semibold text-gray-800">
                      {user.displayName}
                    </Text>
                    <Text className="text-gray-600">{user.email}</Text>
                  </View>
                </View>

                {/* Menu Items */}
                <View className="space-y-2">
                  <TouchableOpacity className="flex-row items-center py-3 px-2 border-b border-gray-100">
                    <UserIcon size={20} color="#4b5563" />
                    <Text className="text-gray-800 ml-3 flex-1">
                      My Profile
                    </Text>
                    <ChevronRight size={18} color="#9ca3af" />
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center py-3 px-2 border-b border-gray-100">
                    <Settings size={20} color="#4b5563" />
                    <Text className="text-gray-800 ml-3 flex-1">Settings</Text>
                    <ChevronRight size={18} color="#9ca3af" />
                  </TouchableOpacity>

                  {/* Logout Button */}
                  <TouchableOpacity
                    className="flex-row items-center py-4 px-4 mt-4 bg-red-50 rounded-xl"
                    onPress={handleLogoutPress}
                  >
                    <LogOut size={20} color="#ef4444" />
                    <Text className="text-red-600 font-medium ml-3">
                      Logout
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Logout Confirmation Modal - Inline implementation instead of using the component */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutConfirmVisible}
        onRequestClose={handleLogoutCancel}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
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

            <View className="flex-row space-x-3 gap-3">
              <TouchableOpacity
                className="flex-1 py-3 bg-gray-100 rounded-xl items-center"
                onPress={handleLogoutCancel}
              >
                <Text className="font-medium text-gray-700">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-3 bg-red-500 rounded-xl items-center"
                onPress={handleLogoutConfirm}
              >
                <Text className="font-medium text-white">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function QuickActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TouchableOpacity className="items-center">
      <View className="bg-blue-50 p-4 rounded-full mb-2">{icon}</View>
      <Text className="text-gray-700">{label}</Text>
    </TouchableOpacity>
  );
}

function SuggestionCard({
  title,
  description,
  progress,
}: {
  title: string;
  description: string;
  progress: number;
}) {
  return (
    <TouchableOpacity className="bg-gray-50 p-4 rounded-xl border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-1">{title}</Text>
      <Text className="text-gray-600 mb-3">{description}</Text>
      {progress > 0 && (
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

function ContactBubble({ name }: { name: string }) {
  // Generate a random color for the avatar
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Get initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <TouchableOpacity className="items-center mr-4">
      <View
        className="w-16 h-16 rounded-full justify-center items-center mb-1"
        style={{ backgroundColor: color }}
      >
        <Text className="text-white text-xl font-bold">{initials}</Text>
      </View>
      <Text className="text-gray-700">{name}</Text>
    </TouchableOpacity>
  );
}
