import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FEBB1B",
        animation: "none",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          tabBarLabel: "Connexion",
          tabBarIcon: ({ color }) => <Ionicons name="log-in" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
