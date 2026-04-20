import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { useTheme, shadows } from "@/theme/ThemeProvider";

interface CardProps extends ViewProps {
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({ style, children, variant = "default", ...p }) => {
  const { theme } = useTheme();

  const variants = {
    default: {
      backgroundColor: theme.surface,
      borderColor: theme.borderLight,
      borderWidth: StyleSheet.hairlineWidth,
      ...shadows.sm,
    },
    elevated: {
      backgroundColor: theme.surface,
      borderColor: theme.borderLight,
      borderWidth: 0,
      ...shadows.md,
    },
    outlined: {
      backgroundColor: "transparent",
      borderColor: theme.border,
      borderWidth: 1,
    },
  };

  return (
    <View
      {...p}
      style={[
        styles.card,
        variants[variant],
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    overflow: "hidden",
  },
});
