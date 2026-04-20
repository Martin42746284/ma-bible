import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Share, Animated } from "react-native";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { fonts, typography } from "@/theme/typography";

interface Props {
  num: number
  text: string
  bookmarked: boolean
  onToggleBookmark: () => void
  reference: string
}

export const VerseItem: React.FC<Props> = ({ num, text, bookmarked, onToggleBookmark, reference }) => {
  const { theme, fontSize } = useTheme();
  const [pressed, setPressed] = useState(false);

  const onLongPress = () => Share.share({ message: `« ${text} »\n— ${reference} (LSG)` });

  return (
    <Pressable
      onPress={onToggleBookmark}
      onLongPress={onLongPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.row,
        {
          backgroundColor: bookmarked ? theme.bookmark : "transparent",
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.numCol}>
        <Text style={[styles.num, { color: theme.accent }]}>{num}</Text>
        {bookmarked && (
          <Text style={[styles.star, { color: theme.accent }]}>★</Text>
        )}
      </View>
      <Text
        style={[
          styles.text,
          {
            color: theme.text,
            fontFamily: fonts.serif,
            fontSize,
            lineHeight: fontSize * 1.6,
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginVertical: 4,
  },
  numCol: {
    width: 32,
    alignItems: "center",
    marginTop: 2,
    marginRight: 8,
  },
  num: {
    fontSize: typography.xs,
    fontWeight: "700",
    lineHeight: typography.xs * 1.2,
  },
  star: {
    fontSize: typography.sm,
    marginTop: 2,
  },
  text: {
    flex: 1,
  },
});
