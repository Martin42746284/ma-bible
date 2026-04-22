import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { useTheme, shadows } from "@/theme/ThemeProvider";

interface GradientCardProps extends ViewProps {
  variant?: "primary" | "secondary" | "accent" | "success" | "warning";
  colors?: [string, string];
}

export const GradientCard: React.FC<GradientCardProps> = ({
  style,
  children,
  variant = "primary",
  colors,
  ...p
}) => {
  const { theme, isDark } = useTheme();

  const colorSchemes = {
    primary: isDark
      ? theme.primary
      : theme.primary,
    secondary: isDark
      ? theme.primaryLight
      : theme.primaryDark,
    accent: theme.accent,
    success: theme.success,
    warning: theme.warning,
  };

  const bgColor = colors ? colors[0] : colorSchemes[variant];

  return (
    <View
      {...p}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
        shadows.md,
        style,
      ]}
    >
      <View style={styles.overlay}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
  },
  overlay: {
    padding: 16,
  },
});
