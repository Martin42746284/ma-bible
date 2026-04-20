import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export const BookCard: React.FC<{ name: string; abrev: string; onPress: () => void }> = ({ name, abrev, onPress }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Text style={[styles.abrev, { color: theme.accent }]}>{abrev}</Text>
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: { flex: 1, minWidth: "47%", padding: 14, borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, margin: 4 },
  abrev: { fontSize: 12, fontWeight: "700", letterSpacing: 1 },
  name: { fontSize: 16, fontWeight: "600", marginTop: 6 },
});
