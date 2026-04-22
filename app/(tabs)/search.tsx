import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { useDebounced } from "@/utils/debounce";
import { search } from "@/services/searchService";
import { typography, spacing } from "@/theme/typography";

const FILTERS = [
  { key: "all", label: "Tout" },
  { key: "ancien", label: "AT" },
  { key: "nouveau", label: "NT" },
] as const;

export default function Search() {
  const { theme } = useTheme();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]["key"]>("all");
  const dq = useDebounced(q, 250);
  const results = useMemo(() => search(dq, filter), [dq, filter]);

  const renderHighlight = (text: string) => {
    if (!dq) return text;
    const parts = text.split(new RegExp(`(${dq})`, "ig"));
    return parts.map((p, i) =>
      p.toLowerCase() === dq.toLowerCase() ? (
        <Text key={i} style={[styles.highlight, { backgroundColor: theme.bookmark }]}>
          {p}
        </Text>
      ) : (
        <Text key={i}>{p}</Text>
      )
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <View style={[styles.inputContainer, { backgroundColor: theme.surface }, shadows.sm]}>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Rechercher…"
            placeholderTextColor={theme.textTertiary}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[
                styles.filter,
                {
                  backgroundColor: filter === f.key ? theme.primary : theme.surface,
                  borderColor: filter === f.key ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: filter === f.key ? theme.textInverse : theme.text },
                ]}
              >
                {f.label === "Tout" ? "Tous" : f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {dq.length >= 2 && (
          <Text style={[styles.resultCount, { color: theme.textSecondary }]}>
            {results.length} résultat{results.length > 1 ? "s" : ""}
          </Text>
        )}
      </View>

      {results.length === 0 && dq.length >= 2 && (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Aucun résultat trouvé
          </Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(r) => `${r.book}-${r.chapter}-${r.verse}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/reader/${encodeURIComponent(item.book)}/${item.chapter}` as any)}
            style={[styles.result, { borderColor: theme.border, backgroundColor: theme.surface }]}
          >
            <Text style={[styles.resultRef, { color: theme.accent }]}>
              {item.book} {item.chapter}:{item.verse}
            </Text>
            <Text style={[styles.resultText, { color: theme.text }]} numberOfLines={4}>
              {renderHighlight(item.text)}
            </Text>
          </Pressable>
        )}
        scrollEnabled={results.length > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[3],
  },
  inputContainer: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: spacing[3],
  },
  input: {
    fontSize: typography.base,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  filterRow: {
    flexDirection: "row",
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  filter: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  filterText: {
    fontSize: typography.sm,
    fontWeight: "600",
  },
  resultCount: {
    fontSize: typography.sm,
    fontWeight: "500",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: typography.base,
  },
  result: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: spacing[3],
    marginVertical: spacing[2],
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  resultRef: {
    fontSize: typography.sm,
    fontWeight: "700",
    marginBottom: spacing[2],
  },
  resultText: {
    fontSize: typography.base,
    lineHeight: typography.base * 1.5,
    color: "#666",
  },
  highlight: {
    fontWeight: "700",
  },
});
