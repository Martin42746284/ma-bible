import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export const Card: React.FC<ViewProps> = ({ style, children, ...p }) => {
  const { theme } = useTheme();
  return (
    <View
      {...p}
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, padding: 18,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
});
