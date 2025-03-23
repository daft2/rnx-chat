import { Tabs } from "expo-router";
import {
  Home,
  type LucideIcon,
  MessageCircle,
  Phone,
  Settings,
} from "lucide-react-native";
import { Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: LucideIcon;
  title: string;
}) => {
  const Icon = icon;

  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Icon color={focused ? "#0061ff" : "#666876"} className="size-6" />
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-blue-200 font-rubik"
        } text-xs w-full text-center mt-1 `}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3b82f6", // blue-500
        tabBarInactiveTintColor: "#6b7280", // gray-500
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={MessageCircle} focused={focused} title="Chats" />
          ),
        }}
      />
      <Tabs.Screen
        name="call-history"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Phone} focused={focused} title="Call History" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Settings} focused={focused} title="Settings" />
          ),
        }}
      />
    </Tabs>
  );
}
