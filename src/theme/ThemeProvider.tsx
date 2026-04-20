import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "./colors";
import { useSettings } from "@/hooks/useSettings";

interface Ctx { theme: Theme; isDark: boolean; fontSize: number; }
const ThemeContext = createContext<Ctx>({ theme: lightTheme, isDark: false, fontSize: 17 });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sys = useColorScheme();
  const { settings } = useSettings();
  const isDark =
    settings.theme === "dark" || (settings.theme === "system" && sys === "dark");
  const value = useMemo(
    () => ({ theme: isDark ? darkTheme : lightTheme, isDark, fontSize: settings.fontSize }),
    [isDark, settings.fontSize]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
