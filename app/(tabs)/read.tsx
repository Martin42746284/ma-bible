import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { useBible } from "@/hooks/useBible";
import { CATEGORIES } from "@/constants/books";
import { BookCard } from "@/components/BookCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Book } from "@/types/bible";

export default function Read() {
  const { theme } = useTheme();
  const { books } = useBible();
  const { testament } = useLocalSearchParams<{ testament?: "ancien" | "nouveau" }>();
  const [selected, setSelected] = useState<Book | null>(null);

  const filtered = useMemo(
    () => testament ? books.filter(b => b.testament === testament) : books,
    [books, testament]
  );

  if (selected) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Pressable onPress={() => setSelected(null)}>
          <Text style={{ color: theme.accent, marginBottom: 8 }}>← Retour</Text>
        </Pressable>
        <SectionHeader title={selected.nom} subtitle={`${selected.chapitres.length} chapitres`} />
        <View style={styles.grid}>
          {selected.chapitres.map(c => (
            <Pressable
              key={c.numero}
              onPress={() => router.push(`/reader/${encodeURIComponent(selected.nom)}/${c.numero}` as any)}
              style={[styles.chip, { backgroundColor: theme.surface, borderColor: theme.border }]}
            >
              <Text style={{ color: theme.text, fontWeight: "700" }}>{c.numero}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SectionHeader title={testament === "nouveau" ? "Nouveau Testament" : testament === "ancien" ? "Ancien Testament" : "Tous les livres"} />
      {CATEGORIES.map(cat => {
        const list = filtered.filter(b => cat.books.includes(b.nom));
        if (!list.length) return null;
        return (
          <View key={cat.label} style={{ marginBottom: 16 }}>
            <Text style={{ color: theme.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>
              {cat.label.toUpperCase()}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {list.map(b => <BookCard key={b.nom} name={b.nom} abrev={b.abrev} onPress={() => setSelected(b)} />)}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { width: 52, height: 52, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, alignItems: "center", justifyContent: "center" },
});
