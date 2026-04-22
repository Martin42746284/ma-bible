import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { useBible } from "@/hooks/useBible";
import { CATEGORIES } from "@/constants/books";
import { BookCard } from "@/components/BookCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Book } from "@/types/bible";
import { typography, spacing } from "@/theme/typography";

export default function Read() {
  const { theme } = useTheme();
  const { books } = useBible();
  const { testament } = useLocalSearchParams<{ testament?: "ancien" | "nouveau" }>();
  const [selected, setSelected] = useState<Book | null>(null);

  const filtered = useMemo(
    () => (testament ? books.filter((b) => b.testament === testament) : books),
    [books, testament]
  );

  // Compute stats for selected book
  const totalChapters = selected ? selected.chapitres.length : 0;

  if (selected) {
    return (
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.bg }]} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setSelected(null)} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.accent }]}>← Retour</Text>
        </Pressable>
        <View style={styles.bookHeader}>
          <Text style={[styles.bookTitle, { color: theme.text }]}>{selected.nom}</Text>
          <Text style={[styles.bookSubtitle, { color: theme.textSecondary }]}>
            {selected.chapitres.length} chapitres
          </Text>
        </View>
        <View style={styles.chapterGrid}>
          {selected.chapitres.map((c) => (
            <Pressable
              key={c.numero}
              onPress={() =>
                router.push(`/reader/${encodeURIComponent(selected.nom)}/${c.numero}` as any)
              }
              style={[
                styles.chapterChip,
                { backgroundColor: theme.primary, borderColor: theme.primaryDark },
              ]}
            >
              <Text style={[styles.chapterNum, { color: theme.textInverse }]}>{c.numero}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  }

  const title =
    testament === "nouveau"
      ? "Nouveau Testament"
      : testament === "ancien"
        ? "Ancien Testament"
        : "Tous les livres";

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.bg }]} showsVerticalScrollIndicator={false}>
      <SectionHeader title={title} />
      {CATEGORIES.map((cat) => {
        const list = filtered.filter((b) => cat.books.includes(b.nom));
        if (!list.length) return null;
        return (
          <View key={cat.label} style={styles.categorySection}>
            <Text
              style={[styles.categoryLabel, { color: theme.text }]}
            >
              {cat.label.toUpperCase()}
            </Text>
            <View style={styles.booksGrid}>
              {list.map((b) => (
                <BookCard
                  key={b.nom}
                  name={b.nom}
                  abrev={b.abrev}
                  onPress={() => setSelected(b)}
                />
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
  },
  backButton: {
    marginBottom: spacing[4],
  },
  backText: {
    fontSize: typography.base,
    fontWeight: "600",
  },
  bookHeader: {
    marginBottom: spacing[6],
  },
  bookTitle: {
    fontSize: typography["2xl"],
    fontWeight: "700",
    marginBottom: spacing[1],
  },
  bookSubtitle: {
    fontSize: typography.base,
    fontWeight: "500",
  },
  categorySection: {
    marginBottom: spacing[6],
  },
  categoryLabel: {
    fontSize: typography.xs,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: spacing[3],
  },
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chapterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[4],
  },
  chapterChip: {
    width: 58,
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterNum: {
    fontSize: typography.base,
    fontWeight: "700",
  },
});
