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

  // Text
  text: palette.text,
  textSecondary: palette.textMuted,
  textTertiary: palette.textLight,
  textInverse: palette.white,

  // Interactive
  primary: palette.deepBlue,
  primaryLight: "#4A7BA7",
  primaryDark: "#0A1F35",

  accent: palette.gold,
  accentLight: palette.amber,

  // States
  success: palette.success,
  warning: palette.warning,
  error: palette.error,

  // UI Elements
  border: palette.border,
  borderLight: palette.borderLight,
  divider: "#E8EBF0",

  // Special
  bookmark: palette.bookmark,
  overlay: "rgba(15, 26, 38, 0.5)",

  // Tab bar
  tabActive: palette.deepBlue,
  tabInactive: palette.textLight,
};

export const darkTheme = {
  // Backgrounds
  bg: palette.midnight,
  surface: "#13263A",
  surfaceAlt: "#1A3650",

  // Text
  text: "#EAF1F8",
  textSecondary: "#8AA0B5",
  textTertiary: "#6E859B",
  textInverse: palette.midnight,

  // Interactive
  primary: palette.skyLight,
  primaryLight: "#E8EFF7",
  primaryDark: "#B8D4EB",

  accent: palette.gold,
  accentLight: palette.amber,

  // States
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",

  // UI Elements
  border: "#1E3550",
  borderLight: "#2A4560",
  divider: "#1F354A",

  // Special
  bookmark: palette.bookmarkDark,
  overlay: "rgba(11, 27, 43, 0.7)",

  // Tab bar
  tabActive: palette.skyLight,
  tabInactive: "#6E859B",
};

export type Theme = typeof lightTheme;
