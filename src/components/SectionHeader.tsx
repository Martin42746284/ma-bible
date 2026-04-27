import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { typography } from "@/theme/typography";

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle && <Text style={[styles.sub, { color: theme.textSecondary }]}>{subtitle}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    marginBottom: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: typography["3xl"],
    fontWeight: "700",
    letterSpacing: -0.5,
    marginBottom: 4,
    textAlign: "center",
  },
  sub: {
    fontSize: typography.base,
    fontWeight: "500",
    lineHeight: typography.normal * typography.base,
  },
});
