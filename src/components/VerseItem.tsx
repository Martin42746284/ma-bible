import React from "react";
import { Pressable, Text, View, StyleSheet, Share } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { fonts } from "@/theme/typography";

interface Props {
  num: number; text: string; bookmarked: boolean;
  onToggleBookmark: () => void; reference: string;
}
export const VerseItem: React.FC<Props> = ({ num, text, bookmarked, onToggleBookmark, reference }) => {
  const { theme, fontSize } = useTheme();
  const onLongPress = () => Share.share({ message: `« ${text} »\n— ${reference} (LSG)` });
  return (
    <Pressable
      onPress={onToggleBookmark}
      onLongPress={onLongPress}
      style={[styles.row, bookmarked && { backgroundColor: theme.bookmark }]}
    >
      <View style={styles.numCol}>
        <Text style={[styles.num, { color: theme.accent }]}>{num}</Text>
        {bookmarked && <Text style={{ color: theme.accent, fontSize: 12 }}>★</Text>}
      </View>
      <Text style={[styles.text, { color: theme.text, fontFamily: fonts.serif, fontSize, lineHeight: fontSize * 1.6 }]}>
        {text}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  row: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  numCol: { width: 28, alignItems: "center", marginTop: 4 },
  num: { fontSize: 12, fontWeight: "700" },
  text: { flex: 1 },
});
