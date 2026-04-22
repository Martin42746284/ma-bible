import React, { useEffect, useMemo } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { useBible } from "@/hooks/useBible";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLastPosition } from "@/hooks/useLastPosition";
import { VerseItem } from "@/components/VerseItem";
import { typography, spacing } from "@/theme/typography";

export default function Reader() {
  const { theme } = useTheme();
  const { book, chapter } = useLocalSearchParams<{ book: string; chapter: string }>();
  const bookName = decodeURIComponent(book);
  const chNum = parseInt(chapter, 10);
  const { getBook, getChapter } = useBible();
  const { isBookmarked, toggle } = useBookmarks();
  const { save } = useLastPosition();

  const b = useMemo(() => getBook(bookName), [bookName]);
  const ch = useMemo(() => getChapter(bookName, chNum), [bookName, chNum]);

  useEffect(() => {
    if (b && ch) save({ book: bookName, chapter: chNum });
  }, [bookName, chNum]);

  if (!b || !ch) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.bg }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Chapitre introuvable.</Text>
      </View>
    );
  }

  const total = b.chapitres.length;
  const go = (delta: number) => {
    const n = chNum + delta;
    if (n >= 1 && n <= total) {
      router.replace(`/reader/${encodeURIComponent(bookName)}/${n}` as any);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `${bookName} ${chNum}`,
          headerTitleStyle: { color: theme.text, fontWeight: "700" },
          headerStyle: { backgroundColor: theme.bg },
          contentStyle: { backgroundColor: theme.bg },
        }}
      />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: spacing[20] }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Chapter header */}
        <View style={styles.chapterHeader}>
          <Text style={[styles.chapterTitle, { color: theme.text }]}>{bookName}</Text>
          <Text style={[styles.chapterNum, { color: theme.textSecondary }]}>
            Chapitre {chNum} / {total}
          </Text>
        </View>

        {/* Progress bar */}
        <View
          style={[
            styles.progressBar,
            { backgroundColor: theme.borderLight },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.primary, width: `${(chNum / total) * 100}%` },
            ]}
          />
        </View>

        {/* Progress text */}
        <Text style={[styles.progressText, { color: theme.textSecondary }]}>
          Progression: {chNum} / {total}
        </Text>

        {/* Verses */}
        <View style={styles.versesContainer}>
          {ch.versets.map((v) => {
            const bk = isBookmarked(bookName, chNum, v.numero);
            return (
              <VerseItem
                key={v.numero}
                num={v.numero}
                text={v.texte}
                bookmarked={bk}
                reference={`${bookName} ${chNum}:${v.numero}`}
                onToggleBookmark={() =>
                  toggle({
                    book: bookName,
                    chapter: chNum,
                    verse: v.numero,
                    text: v.texte,
                  })
                }
              />
            );
          })}
        </View>

        {/* Navigation */}
        <View style={styles.navContainer}>
          <Pressable
            disabled={chNum <= 1}
            onPress={() => go(-1)}
            style={[
              styles.navBtn,
              { borderColor: theme.border, opacity: chNum <= 1 ? 0.4 : 1 },
              shadows.sm,
            ]}
          >
            <Text style={[styles.navBtnText, { color: theme.text }]}>
              ← Précédent
            </Text>
          </Pressable>

          <Pressable
            disabled={chNum >= total}
            onPress={() => go(1)}
            style={[
              styles.navBtn,
              { borderColor: theme.border, opacity: chNum >= total ? 0.4 : 1 },
              shadows.sm,
            ]}
          >
            <Text style={[styles.navBtnText, { color: theme.text }]}>
              Suivant →
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* FAB for settings */}
      <Pressable
        onPress={() => router.push("/settings" as any)}
        style={[styles.fab, { backgroundColor: theme.primary }, shadows.lg]}
      >
        <Text style={[styles.fabText, { color: theme.textInverse }]}>Aa</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[4],
  },
  errorText: {
    fontSize: typography.base,
  },
  content: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  chapterHeader: {
    marginBottom: spacing[4],
  },
  chapterTitle: {
    fontSize: typography["2xl"],
    fontWeight: "700",
    marginBottom: spacing[1],
  },
  chapterNum: {
    fontSize: typography.sm,
    fontWeight: "500",
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: spacing[6],
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: typography.xs,
    fontWeight: "600",
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  versesContainer: {
    marginBottom: spacing[6],
  },
  navContainer: {
    flexDirection: "row",
    gap: spacing[3],
    marginTop: spacing[4],
  },
  navBtn: {
    flex: 1,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnText: {
    fontSize: typography.base,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    right: spacing[4],
    bottom: spacing[6],
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    fontSize: typography.lg,
    fontWeight: "700",
  },
});
