import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { useVerseOfDay } from "@/hooks/useVerseOfDay";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLastPosition } from "@/hooks/useLastPosition";
import { getJSON, KEYS } from "@/services/storage";
import { fonts } from "@/theme/typography";

export default function Home() {
  const { theme } = useTheme();
  const vod = useVerseOfDay();
  const { bookmarks } = useBookmarks();
  const { last } = useLastPosition();
  const [days, setDays] = React.useState(0);
  React.useEffect(() => { getJSON<string[]>(KEYS.history, []).then((h) => setDays(h.length)); }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <SectionHeader title="Ma Bible" subtitle="Louis Segond 1910" />

      <Card>
        <Text style={{ color: theme.accent, fontSize: 12, fontWeight: "700", letterSpacing: 1 }}>VERSET DU JOUR</Text>
        <Text style={{ color: theme.text, fontFamily: fonts.serif, fontSize: 18, lineHeight: 28, marginTop: 8 }}>
          « {vod.text} »
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: 10 }}>{vod.book} {vod.chapter}:{vod.verse}</Text>
      </Card>

      {last && (
        <Pressable onPress={() => router.push(`/reader/${encodeURIComponent(last.book)}/${last.chapter}` as any)}>
          <Card>
            <Text style={{ color: theme.textMuted, fontSize: 12 }}>Reprendre la lecture</Text>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700", marginTop: 4 }}>
              {last.book} {last.chapter}
            </Text>
          </Card>
        </Pressable>
      )}

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Pressable style={{ flex: 1 }} onPress={() => router.push("/read?testament=ancien" as any)}>
          <Card><Text style={[s.kbd, { color: theme.accent }]}>AT</Text><Text style={[s.label, { color: theme.text }]}>Ancien Testament</Text></Card>
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => router.push("/read?testament=nouveau" as any)}>
          <Card><Text style={[s.kbd, { color: theme.accent }]}>NT</Text><Text style={[s.label, { color: theme.text }]}>Nouveau Testament</Text></Card>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Stat label="Favoris" value={bookmarks.length} />
        <Stat label="Jours de lecture" value={days} />
        <Stat label="Progression" value={`${Math.min(100, Math.round((days/365)*100))}%`} />
      </View>
    </ScrollView>
  );
}

const Stat = ({ label, value }: { label: string; value: number | string }) => {
  const { theme } = useTheme();
  return (
    <Card style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: "800" }}>{value}</Text>
      <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>{label}</Text>
    </Card>
  );
};

const s = StyleSheet.create({
  kbd: { fontSize: 12, fontWeight: "800", letterSpacing: 2 },
  label: { fontSize: 16, fontWeight: "700", marginTop: 6 },
});
