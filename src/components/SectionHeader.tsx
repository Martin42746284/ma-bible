import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle && <Text style={[styles.sub, { color: theme.textMuted }]}>{subtitle}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700", letterSpacing: 0.2 },
  sub: { fontSize: 14, marginTop: 4 },
});
