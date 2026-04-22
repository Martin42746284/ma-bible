import React, { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Platform } from "react-native";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { useBookmarks } from "@/hooks/useBookmarks";
import { typography, spacing } from "@/theme/typography";

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
    const jsonData = JSON.stringify(bookmarks, null, 2);

    if (Platform.OS === "web") {
      // Web: Utiliser le blob et télécharger
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "favoris.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Alert.alert("Export", "Vos favoris ont été téléchargés");
    } else {
      // Native: Utiliser FileSystem
      const path = FileSystem.cacheDirectory + "favoris.json";
      await FileSystem.writeAsStringAsync(path, jsonData);
      if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(path);
      else Alert.alert("Export", "Fichier préparé : " + path);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Tabs */}
      <View style={[styles.tabsContainer, { borderBottomColor: theme.border }]}>
        <View style={styles.tabsScroll}>
          {TABS.map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.tab,
                {
                  borderBottomColor: tab === t ? theme.primary : "transparent",
                  borderBottomWidth: tab === t ? 3 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: tab === t ? theme.primary : theme.textSecondary },
                ]}
              >
                {t}
              </Text>
            </Pressable>
          ))}
          <Pressable
            onPress={exportJson}
            style={[styles.tab, { marginLeft: "auto" }]}
          >
            <Text style={[styles.tabText, { color: theme.accent }]}>⬇ Exporter</Text>
          </Pressable>
        </View>
      </View>

      {/* Empty state */}
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyIcon]}>☆</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Aucun favori pour l'instant
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textTertiary }]}>
            Appuyez sur un verset pour le sauvegarder
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(b) => b.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
            onLongPress={() => remove(item.id)}
            onPress={() =>
              router.push(`/reader/${encodeURIComponent(item.book)}/${item.chapter}` as any)
            }
            style={[styles.bookmarkCard, { backgroundColor: theme.surface }, shadows.md]}
          >
              <View style={styles.bookmarkHeader}>
                <Text style={[styles.bookmarkRef, { color: theme.accent }]}>
                  {item.book} {item.chapter}:{item.verse}
                </Text>
                <Text style={[styles.bookmarkDate, { color: theme.textTertiary }]}>
                  {new Date(item.addedAt).toLocaleDateString("fr-FR")}
                </Text>
              </View>
              <Text
                style={[styles.bookmarkText, { color: theme.text }]}
                numberOfLines={3}
              >
                {item.text}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabsScroll: {
    flexDirection: "row",
    paddingHorizontal: spacing[4],
  },
  tab: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
    marginRight: spacing[2],
  },
  tabText: {
    fontSize: typography.sm,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[4],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  emptyText: {
    fontSize: typography.lg,
    fontWeight: "700",
    marginBottom: spacing[2],
  },
  emptySubtext: {
    fontSize: typography.base,
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    gap: spacing[3],
  },
  bookmarkCard: {
    borderRadius: 14,
    padding: spacing[4],
    marginBottom: spacing[2],
  },
  bookmarkHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  bookmarkRef: {
    fontSize: typography.sm,
    fontWeight: "700",
  },
  bookmarkDate: {
    fontSize: typography.xs,
  },
  bookmarkText: {
    fontSize: typography.base,
    lineHeight: typography.base * 1.6,
  },
});
