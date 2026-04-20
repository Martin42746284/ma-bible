import React, { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useTheme } from "@/theme/ThemeProvider";
import { useBookmarks } from "@/hooks/useBookmarks";

const TABS = ["Tous", "Récents", "Catégories"] as const;

export default function Favorites() {
  const { theme } = useTheme();
  const { bookmarks, remove } = useBookmarks();
  const [tab, setTab] = useState<typeof TABS[number]>("Tous");

  const data = useMemo(() => {
    const sorted = [...bookmarks].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    if (tab === "Récents") return sorted.slice(0, 20);
    return sorted;
  }, [bookmarks, tab]);

  const exportJson = async () => {
    const path = FileSystem.cacheDirectory + "favoris.json";
    await FileSystem.writeAsStringAsync(path, JSON.stringify(bookmarks, null, 2));
    if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(path);
    else Alert.alert("Export", path);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {TABS.map(t => (
          <Pressable key={t} onPress={() => setTab(t)}
            style={[styles.tab, { borderColor: theme.border, backgroundColor: tab===t ? theme.primary : "transparent" }]}>
            <Text style={{ color: tab===t ? theme.bg : theme.text }}>{t}</Text>
          </Pressable>
        ))}
        <Pressable onPress={exportJson} style={[styles.tab, { borderColor: theme.accent }]}>
          <Text style={{ color: theme.accent }}>Exporter</Text>
        </Pressable>
      </View>

      {bookmarks.length === 0 ? (
        <Text style={{ color: theme.textMuted, marginTop: 24 }}>Aucun favori pour l'instant.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(b) => b.id}
          contentContainerStyle={{ paddingTop: 12 }}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => remove(item.id)}
              onPress={() => router.push(`/reader/${encodeURIComponent(item.book)}/${item.chapter}` as any)}
              style={[styles.row, { borderColor: theme.border }]}
            >
              <Text style={{ color: theme.accent, fontWeight: "700" }}>{item.book} {item.chapter}:{item.verse}</Text>
              <Text style={{ color: theme.text, marginTop: 4 }} numberOfLines={2}>{item.text}</Text>
              <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>
                {new Date(item.addedAt).toLocaleDateString()}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  tab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
  row: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
});
