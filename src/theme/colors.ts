export const palette = {
  // Primary
  midnight: "#0B1B2B",
  deepBlue: "#11314F",
  blue: "#2B5C8A",

  // Light neutrals
  skyLight: "#D9E6F2",
  ivory: "#F7F4EC",
  cream: "#FAF8F3",

  // Accent
  gold: "#C9A24B",
  amber: "#D4A574",

  // Semantic
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  // Text
  text: "#0F1A26",
  textMuted: "#5B6A7A",
  textLight: "#8B97A8",

  // Borders & backgrounds
  border: "#E3E8EE",
  borderLight: "#F0F3F7",
  white: "#FFFFFF",

  // Special
  bookmark: "#FFF4C2",
  bookmarkDark: "#3A3110",
};

export const lightTheme = {
  // Backgrounds
  bg: palette.ivory,
  surface: palette.white,
  surfaceAlt: palette.cream,

  // Text - Improved contrast
  text: "#0A1420",
  textSecondary: "#4A5A6E",
  textTertiary: "#7A8A9E",
  textInverse: palette.white,

  // Interactive
  primary: palette.deepBlue,
  primaryLight: "#2B5C8A",
  primaryDark: "#0A1F35",

  accent: palette.gold,
  accentLight: palette.amber,

  // States
  success: "#059669",
  warning: "#D97706",
  error: "#DC2626",

  // UI Elements
  border: palette.border,
  borderLight: palette.borderLight,
  divider: "#E8EBF0",

  // Special
  bookmark: palette.bookmark,
  overlay: "rgba(15, 26, 38, 0.5)",

  // Tab bar
  tabActive: palette.deepBlue,
  tabInactive: "#7A8A9E",
};

export const darkTheme = {
  // Backgrounds
  bg: palette.midnight,
  surface: "#13263A",
  surfaceAlt: "#1A3650",

  // Text - Improved contrast
  text: "#F5F9FF",
  textSecondary: "#98AFCA",
  textTertiary: "#7A92A8",
  textInverse: palette.midnight,

  // Interactive
  primary: "#D9E6F2",
  primaryLight: "#E8EFF7",
  primaryDark: "#C0D7F0",

  accent: palette.gold,
  accentLight: palette.amber,

  // States
  success: "#4ADE80",
  warning: "#FCD34D",
  error: "#FF8787",

  // UI Elements
  border: "#1E3550",
  borderLight: "#2A4560",
  divider: "#1F354A",

  // Special
  bookmark: palette.bookmarkDark,
  overlay: "rgba(11, 27, 43, 0.7)",

  // Tab bar
  tabActive: "#D9E6F2",
  tabInactive: "#7A92A8",
};

export type Theme = typeof lightTheme;
