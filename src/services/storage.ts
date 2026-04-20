import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  bookmarks: "@bible:bookmarks",
  lastPosition: "@bible:last_position",
  history: "@bible:reading_history",
  settings: "@bible:settings",
} as const;

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
export async function setJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
export async function clearAll(): Promise<void> {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
