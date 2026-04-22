import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { typography } from "@/theme/typography";

export const BookCard: React.FC<{ name: string; abrev: string; onPress: () => void }> = ({ name, abrev, onPress }) => {
  const { theme } = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.card,
        {
          backgroundColor: pressed ? theme.primaryLight : theme.primary,
          opacity: pressed ? 0.8 : 1,
        },
        shadows.md,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.abrev, { color: theme.textInverse }]}>{abrev}</Text>
        <Text style={[styles.name, { color: theme.textInverse }]} numberOfLines={2}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "47%",
    padding: 16,
    borderRadius: 14,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  abrev: {
    fontSize: typography.xs,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  name: {
    fontSize: typography.sm,
    fontWeight: "600",
    textAlign: "center",
  },
});
