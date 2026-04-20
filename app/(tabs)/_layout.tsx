import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

const Icon = ({ label, focused, color }: { label: string; focused: boolean; color: string }) => (
  <Text style={{ fontSize: 18, color, opacity: focused ? 1 : 0.7 }}>{label}</Text>
);

export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: theme.bg },
      headerTitleStyle: { color: theme.text },
      tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
      tabBarActiveTintColor: theme.tabActive,
      tabBarInactiveTintColor: theme.tabInactive,
    }}>
      <Tabs.Screen name="index"     options={{ title: "Accueil",    tabBarIcon: (p) => <Icon label="✦" {...p} /> }} />
      <Tabs.Screen name="read"      options={{ title: "Lire",       tabBarIcon: (p) => <Icon label="📖" {...p} /> }} />
      <Tabs.Screen name="search"    options={{ title: "Rechercher", tabBarIcon: (p) => <Icon label="🔍" {...p} /> }} />
      <Tabs.Screen name="favorites" options={{ title: "Favoris",    tabBarIcon: (p) => <Icon label="★" {...p} /> }} />
    </Tabs>
  );
}
