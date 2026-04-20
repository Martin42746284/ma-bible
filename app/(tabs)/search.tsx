import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { useDebounced } from "@/utils/debounce";
import { search } from "@/services/searchService";

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
      p.toLowerCase() === dq.toLowerCase()
        ? <Text key={i} style={{ backgroundColor: theme.bookmark, color: theme.text }}>{p}</Text>
        : <Text key={i}>{p}</Text>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={q} onChangeText={setQ}
        placeholder="Rechercher dans la Bible…"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
      />
      <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
        {FILTERS.map(f => (
          <Pressable key={f.key} onPress={() => setFilter(f.key)}
            style={[styles.chip, { borderColor: theme.border, backgroundColor: filter===f.key ? theme.primary : "transparent" }]}>
            <Text style={{ color: filter===f.key ? theme.bg : theme.text }}>{f.label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={{ color: theme.textMuted, marginVertical: 10 }}>
        {dq.length < 2 ? "Tapez au moins 2 caractères." : `${results.length} résultat(s)`}
      </Text>
      <FlatList
        data={results}
        keyExtractor={(r) => `${r.book}-${r.chapter}-${r.verse}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/reader/${encodeURIComponent(item.book)}/${item.chapter}` as any)}
            style={[styles.row, { borderColor: theme.border }]}
          >
            <Text style={{ color: theme.accent, fontWeight: "700", marginBottom: 4 }}>
              {item.book} {item.chapter}:{item.verse}
            </Text>
            <Text style={{ color: theme.text }}>{renderHighlight(item.text)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 12, padding: 14, fontSize: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
  row: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
});
