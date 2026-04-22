import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "./colors";
import { useSettings } from "@/hooks/useSettings";

export const shadows = {
  none: { elevation: 0 },
  xs: { elevation: 1, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  sm: { elevation: 2, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  md: { elevation: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  lg: { elevation: 6, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  xl: { elevation: 8, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
};

interface Ctx {
  theme: Theme
  isDark: boolean
  fontSize: number
  shadows: typeof shadows
}

const ThemeContext = createContext<Ctx>({
  theme: lightTheme,
  isDark: false,
  fontSize: 17,
  shadows,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sys = useColorScheme();
  const { settings } = useSettings();
  const isDark =
    settings.theme === "dark" || (settings.theme === "system" && sys === "dark");
  const value = useMemo(
    () => ({
      theme: isDark ? darkTheme : lightTheme,
      isDark,
      fontSize: settings.fontSize,
      shadows,
    }),
    [isDark, settings.theme, settings.fontSize, sys]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
