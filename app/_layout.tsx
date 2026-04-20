import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

function Inner() {
  const { isDark, theme } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.bg },
        headerTitleStyle: { color: theme.text, fontWeight: "700" },
        contentStyle: { backgroundColor: theme.bg },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="reader/[book]/[chapter]" options={{ title: "" }} />
        <Stack.Screen name="settings" options={{ presentation: "modal", title: "Paramètres" }} />
      </Stack>
    </>
  );
}
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider><Inner /></ThemeProvider>
    </SafeAreaProvider>
  );
}
