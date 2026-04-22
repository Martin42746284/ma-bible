import React from "react";
import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import { useTheme, shadows } from "@/theme/ThemeProvider";
import { useSettings } from "@/hooks/useSettings";
import { clearAll } from "@/services/storage";
import { router } from "expo-router";
import { typography, spacing } from "@/theme/typography";

export default function Settings() {
  const { theme } = useTheme();
  const { settings, update } = useSettings();

  const handleReset = () => {
    Alert.alert(
      "Réinitialiser les données",
      "Êtes-vous sûr ? Cette action effacera vos favoris, votre progression et vos paramètres.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Effacer",
          style: "destructive",
          onPress: async () => {
            await clearAll();
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      {/* Appearance Section */}
      <Section title="🎨 Apparence">
        <Row label="Thème">
          {(["system", "light", "dark"] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => update({ theme: t })}
              style={[
                styles.themeOption,
                {
                  backgroundColor:
                    settings.theme === t ? theme.primary : theme.surface,
                  borderColor:
                    settings.theme === t ? theme.primaryDark : theme.border,
                },
                shadows.sm,
              ]}
            >
              <Text
                style={[
                  styles.themeText,
                  {
                    color:
                      settings.theme === t
                        ? theme.textInverse
                        : theme.text,
                  },
                ]}
                allowFontScaling={true}
                maxFontSizeMultiplier={1.2}
              >
                {t === "system"
                  ? "🖥 Système"
                  : t === "light"
                    ? "☀ Clair"
                    : "🌙 Sombre"}
              </Text>
            </Pressable>
          ))}
        </Row>

        <Row label={`Taille du texte — ${settings.fontSize}px`}>
          <View style={styles.fontSizeControl}>
            <Pressable
              onPress={() => update({ fontSize: Math.max(14, settings.fontSize - 1) })}
              style={[styles.fontBtn, { backgroundColor: theme.surface }, shadows.sm]}
            >
              <Text
                style={[styles.fontBtnText, { color: theme.text }]}
                allowFontScaling={true}
              >
                A−
              </Text>
            </Pressable>
            <View
              style={[
                styles.fontPreview,
                { backgroundColor: theme.surfaceAlt, borderColor: theme.border },
              ]}
            >
              <Text
                style={[styles.fontPreviewText, { fontSize: settings.fontSize, color: theme.text }]}
                allowFontScaling={true}
                maxFontSizeMultiplier={1.2}
              >
                Exemple
              </Text>
            </View>
            <Pressable
              onPress={() => update({ fontSize: Math.min(24, settings.fontSize + 1) })}
              style={[styles.fontBtn, { backgroundColor: theme.surface }, shadows.sm]}
            >
              <Text
                style={[styles.fontBtnText, { color: theme.text }]}
                allowFontScaling={true}
              >
                A+
              </Text>
            </Pressable>
          </View>
        </Row>
      </Section>

      {/* Data Section */}
      <Section title="💾 Données">
        <Pressable
          onPress={handleReset}
          style={[styles.dangerBtn, { backgroundColor: theme.surface }, shadows.sm]}
        >
          <Text
            style={[styles.dangerBtnText, { color: theme.error }]}
            allowFontScaling={true}
            maxFontSizeMultiplier={1.2}
          >
            ⚠️ Réinitialiser les données
          </Text>
        </Pressable>
        <Text
          style={[styles.helperText, { color: theme.textTertiary }]}
          allowFontScaling={true}
          maxFontSizeMultiplier={1.2}
        >
          Cela effacera vos favoris, votre progression et vos paramètres.
        </Text>
      </Section>

      {/* About Section */}
      <Section title="ℹ️ À propos">
        <View style={[styles.aboutBox, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
          <Text
            style={[styles.aboutTitle, { color: theme.text }]}
            allowFontScaling={true}
            maxFontSizeMultiplier={1.2}
          >
            Ma Bible
          </Text>
          <Text
            style={[styles.aboutText, { color: theme.textSecondary }]}
            allowFontScaling={true}
            maxFontSizeMultiplier={1.2}
          >
            Application de lecture biblique 100% hors ligne
          </Text>
          <Text
            style={[styles.aboutVersion, { color: theme.textTertiary }]}
            allowFontScaling={true}
            maxFontSizeMultiplier={1.2}
          >
            Version 1.0 • Louis Segond 1910 (domaine public)
          </Text>
        </View>

        <Text
          style={[styles.featureTitle, { color: theme.text }]}
          allowFontScaling={true}
          maxFontSizeMultiplier={1.2}
        >
          Fonctionnalités
        </Text>
        <View style={styles.featuresList}>
          {[
            "📖 Lecture complète de la Bible",
            "🔍 Recherche plein-texte",
            "⭐ Marque-pages et favoris",
            "🌙 Mode sombre automatique",
            "🔒 Aucune donnée partagée",
            "⚡ Fonctionne hors ligne",
          ].map((feature, idx) => (
            <Text
              key={idx}
              style={[styles.featureItem, { color: theme.textSecondary }]}
              allowFontScaling={true}
              maxFontSizeMultiplier={1.2}
            >
              {feature}
            </Text>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text
        style={[styles.sectionTitle, { color: theme.text }]}
        allowFontScaling={true}
        maxFontSizeMultiplier={1.2}
      >
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.row}>
      <Text
        style={[styles.rowLabel, { color: theme.textSecondary }]}
        allowFontScaling={true}
        maxFontSizeMultiplier={1.2}
      >
        {label}
      </Text>
      <View style={styles.rowContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
    gap: spacing[6],
  },

  // Section
  section: {
    marginBottom: spacing[2],
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: "700",
    marginBottom: spacing[4],
  },
  sectionContent: {
    gap: spacing[4],
  },

  // Row
  row: {
    gap: spacing[3],
  },
  rowLabel: {
    fontSize: typography.base,
    fontWeight: "600",
  },
  rowContent: {
    flexDirection: "row",
    gap: spacing[2],
    flexWrap: "wrap",
  },

  // Theme options
  themeOption: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: 12,
    borderWidth: 2,
    flex: 1,
    minWidth: 100,
    alignItems: "center",
  },
  themeText: {
    fontSize: typography.sm,
    fontWeight: "600",
  },

  // Font size control
  fontSizeControl: {
    flexDirection: "row",
    gap: spacing[2],
    alignItems: "center",
  },
  fontBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fontBtnText: {
    fontSize: typography.lg,
    fontWeight: "700",
  },
  fontPreview: {
    flex: 1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  fontPreviewText: {
    fontWeight: "500",
  },

  // Danger button
  dangerBtn: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: 12,
  },
  dangerBtnText: {
    fontSize: typography.base,
    fontWeight: "600",
  },
  helperText: {
    fontSize: typography.sm,
    fontStyle: "italic",
  },

  // About
  aboutBox: {
    padding: spacing[4],
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  aboutTitle: {
    fontSize: typography.lg,
    fontWeight: "700",
    marginBottom: spacing[1],
  },
  aboutText: {
    fontSize: typography.base,
    marginBottom: spacing[2],
  },
  aboutVersion: {
    fontSize: typography.sm,
  },

  // Features
  featureTitle: {
    fontSize: typography.base,
    fontWeight: "700",
    marginBottom: spacing[2],
    marginTop: spacing[2],
  },
  featuresList: {
    gap: spacing[2],
  },
  featureItem: {
    fontSize: typography.base,
  },
});
