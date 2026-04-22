import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { useVerseOfDay } from "@/hooks/useVerseOfDay";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLastPosition } from "@/hooks/useLastPosition";
import { getJSON, KEYS } from "@/services/storage";
import { fonts, typography, spacing } from "@/theme/typography";

export default function Home() {
  const { theme } = useTheme();
  const vod = useVerseOfDay();
  const { bookmarks } = useBookmarks();
  const { last } = useLastPosition();
  const [days, setDays] = React.useState(0);
  React.useEffect(() => { getJSON<string[]>(KEYS.history, []).then((h) => setDays(h.length)); }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Ma Bible" subtitle="Louis Segond 1910" />

      {/* Verset du jour */}
      <View
        style={[
          styles.verseCard,
          {
            backgroundColor: theme.primary,
          },
          shadows.lg,
        ]}
      >
        <Text style={[styles.verseLabel, { color: theme.primaryLight }]}>
          ✨ VERSET DU JOUR
        </Text>
        <Text
          style={[
            styles.verseText,
            { color: theme.textInverse, fontFamily: fonts.serif },
          ]}
        >
          « {vod.text} »
        </Text>
        <Text
          style={[
            styles.verseRef,
            { color: theme.primaryLight },
          ]}
        >
          {vod.book} {vod.chapter}:{vod.verse}
        </Text>
      </View>

      {/* Reprendre la lecture */}
      {last && (
        <Pressable
          onPress={() =>
            router.push(`/reader/${encodeURIComponent(last.book)}/${last.chapter}` as any)
          }
        >
          <View
            style={[
              styles.resumeCard,
              { backgroundColor: theme.surface },
              shadows.md,
            ]}
          >
            <View style={styles.resumeContent}>
              <View>
                <Text
                  style={[styles.resumeLabel, { color: theme.textSecondary }]}
                >
                  📌 Reprendre la lecture
                </Text>
                <Text style={[styles.resumeTitle, { color: theme.text }]}>
                  {last.book} {last.chapter}
                </Text>
              </View>
              <View
                style={[
                  styles.resumeArrow,
                  { backgroundColor: theme.accent },
                ]}
              >
                <Text style={styles.arrowText}>→</Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}

      {/* Accès rapide aux testaments */}
      <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>ACCÈS RAPIDE</Text>
      <View style={styles.testamentRow}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => router.push("/read?testament=ancien" as any)}
        >
          <View style={[
            styles.testamentCard,
            { backgroundColor: theme.primary },
            shadows.lg,
          ]}>
            <Text style={[styles.testamentIcon]}>📕</Text>
            <Text style={[styles.testamentKbd, { color: theme.textInverse }]}>AT</Text>
            <Text style={[styles.testamentLabel, { color: theme.textInverse }]}>
              Ancien Testament
            </Text>
            <Text style={[styles.testamentCount, { color: theme.primaryLight }]}>39 livres</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => router.push("/read?testament=nouveau" as any)}
        >
          <View style={[
            styles.testamentCard,
            { backgroundColor: theme.primaryLight },
            shadows.lg,
          ]}>
            <Text style={[styles.testamentIcon]}>📗</Text>
            <Text style={[styles.testamentKbd, { color: theme.textInverse }]}>NT</Text>
            <Text style={[styles.testamentLabel, { color: theme.textInverse }]}>
              Nouveau Testament
            </Text>
            <Text style={[styles.testamentCount, { color: theme.primary }]}>27 livres</Text>
          </View>
        </Pressable>
      </View>

      {/* Statistiques */}
      <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>VOTRE PROGRESSION</Text>
      <View style={styles.statsRow}>
        <Stat label="Favoris" value={bookmarks.length} />
        <Stat label="Jours de lecture" value={days} />
        <Stat label="Progression" value={`${Math.min(100, Math.round((days / 365) * 100))}%`} />
      </View>
    </ScrollView>
  );
}

const Stat = ({ label, value }: { label: string; value: number | string }) => {
  const { theme } = useTheme();
  return (
    <Card variant="outlined" style={[styles.stat, { borderColor: theme.borderLight }]}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
    gap: spacing[4],
  },

  // Verset du jour
  verseCard: {
    borderRadius: 16,
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
  },
  verseLabel: {
    fontSize: typography.xs,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  verseText: {
    fontSize: typography.lg,
    lineHeight: typography.lg * typography.relaxed,
    marginTop: spacing[4],
    fontStyle: "italic",
  },
  verseRef: {
    fontSize: typography.sm,
    marginTop: spacing[3],
    fontWeight: "500",
  },

  // Reprendre la lecture
  resumeCard: {
    borderRadius: 16,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },
  resumeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resumeLabel: {
    fontSize: typography.sm,
    fontWeight: "500",
  },
  resumeTitle: {
    fontSize: typography.lg,
    fontWeight: "700",
    marginTop: spacing[1],
  },
  resumeArrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: typography.xl,
    fontWeight: "700",
    color: "white",
  },

  // Accès rapide
  sectionLabel: {
    fontSize: typography.xs,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: spacing[2],
    marginBottom: spacing[2],
  },
  testamentRow: {
    flexDirection: "row",
    gap: spacing[3],
  },
  testamentCard: {
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  testamentIcon: {
    fontSize: 36,
    marginBottom: spacing[2],
  },
  testamentKbd: {
    fontSize: typography.xs,
    fontWeight: "800",
    letterSpacing: 2,
  },
  testamentLabel: {
    fontSize: typography.sm,
    fontWeight: "700",
    marginTop: spacing[2],
    textAlign: "center",
  },
  testamentCount: {
    fontSize: typography.xs,
    marginTop: spacing[2],
    fontWeight: "500",
  },

  // Statistiques
  statsRow: {
    flexDirection: "row",
    gap: spacing[3],
  },
  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing[4],
  },
  statValue: {
    fontSize: typography["2xl"],
    fontWeight: "800",
  },
  statLabel: {
    fontSize: typography.xs,
    fontWeight: "600",
    marginTop: spacing[2],
  },
});
