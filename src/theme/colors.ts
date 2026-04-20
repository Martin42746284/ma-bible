export const palette = {
  midnight: "#0B1B2B",
  deepBlue: "#11314F",
  blue: "#2B5C8A",
  skyLight: "#D9E6F2",
  ivory: "#F7F4EC",
  gold: "#C9A24B",
  bookmark: "#FFF4C2",
  text: "#0F1A26",
  textMuted: "#5B6A7A",
  border: "#E3E8EE",
  white: "#FFFFFF",
};

export const lightTheme = {
  bg: palette.ivory,
  surface: palette.white,
  text: palette.text,
  textMuted: palette.textMuted,
  primary: palette.deepBlue,
  accent: palette.gold,
  border: palette.border,
  bookmark: palette.bookmark,
  tabActive: palette.deepBlue,
  tabInactive: palette.textMuted,
};

export const darkTheme = {
  bg: palette.midnight,
  surface: "#13263A",
  text: "#EAF1F8",
  textMuted: "#8AA0B5",
  primary: palette.skyLight,
  accent: palette.gold,
  border: "#1E3550",
  bookmark: "#3A3110",
  tabActive: palette.skyLight,
  tabInactive: "#6E859B",
};

export type Theme = typeof lightTheme;
