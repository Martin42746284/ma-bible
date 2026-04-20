import React, { useEffect, useMemo } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { useBible } from "@/hooks/useBible";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLastPosition } from "@/hooks/useLastPosition";
import { VerseItem } from "@/components/VerseItem";

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

  useEffect(() => { if (b && ch) save({ book: bookName, chapter: chNum }); }, [bookName, chNum]);

  if (!b || !ch) return <View style={{ padding: 24 }}><Text>Chapitre introuvable.</Text></View>;

  const total = b.chapitres.length;
  const go = (delta: number) => {
    const n = chNum + delta;
    if (n >= 1 && n <= total) router.replace(`/reader/${encodeURIComponent(bookName)}/${n}` as any);
  };

  return (
    <>
      <Stack.Screen options={{ title: `${bookName} ${chNum}` }} />
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 100 }}>
        {ch.versets.map(v => {
          const bk = isBookmarked(bookName, chNum, v.numero);
          return (
            <VerseItem
              key={v.numero}
              num={v.numero}
              text={v.texte}
              bookmarked={bk}
              reference={`${bookName} ${chNum}:${v.numero}`}
              onToggleBookmark={() => toggle({ book: bookName, chapter: chNum, verse: v.numero, text: v.texte })}
            />
          );
        })}
        <View style={styles.nav}>
          <Pressable disabled={chNum<=1} onPress={() => go(-1)} style={[styles.btn, { borderColor: theme.border, opacity: chNum<=1?0.3:1 }]}>
            <Text style={{ color: theme.text }}>← Précédent</Text>
          </Pressable>
          <Pressable disabled={chNum>=total} onPress={() => go(1)} style={[styles.btn, { borderColor: theme.border, opacity: chNum>=total?0.3:1 }]}>
            <Text style={{ color: theme.text }}>Suivant →</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Pressable onPress={() => router.push("/settings" as any)} style={[styles.fab, { backgroundColor: theme.primary }]}>
        <Text style={{ color: theme.bg, fontSize: 18 }}>Aa</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  nav: { flexDirection: "row", justifyContent: "space-between", marginTop: 16, paddingHorizontal: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderWidth: StyleSheet.hairlineWidth, borderRadius: 12 },
  fab: { position: "absolute", right: 18, bottom: 24, width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", elevation: 4 },
});
