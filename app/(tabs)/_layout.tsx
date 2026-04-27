import { Tabs } from "expo-router";
import { Text, StyleSheet } from "react-native";
import { useTheme, shadows } from "@/theme/ThemeProvider";

const Icon = ({
  label,
  focused,
  color,
}: {
  label: string;
  focused: boolean;
  color: string;
}) => (
  <Text
    style={[
      styles.icon,
      {
        color,
        opacity: focused ? 1 : 0.6,
        fontSize: focused ? 22 : 20,
      },
    ]}
  >
    {label}
  </Text>
);

export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.bg },
        headerTitleStyle: { color: theme.text, fontWeight: "700" },
        headerShown: true,
        contentStyle: { backgroundColor: theme.bg },
        tabBarStyle: [
          {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
            borderTopWidth: StyleSheet.hairlineWidth,
          },
          shadows.md,
        ],
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          headerShown: false,
          tabBarIcon: (p) => <Icon label="✦" {...p} />,
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: "Lire",
          tabBarIcon: (p) => <Icon label="📖" {...p} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Rechercher",
          tabBarIcon: (p) => <Icon label="🔍" {...p} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoris",
          tabBarIcon: (p) => <Icon label="⭐" {...p} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: "600",
  },
});
