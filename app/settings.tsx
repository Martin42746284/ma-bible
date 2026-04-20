import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { useSettings } from "@/hooks/useSettings";
import { clearAll } from "@/services/storage";
import { router } from "expo-router";

export default function Settings() {
  const { theme } = useTheme();
  const { settings, update } = useSettings();

  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      <Section title="Apparence">
        <Row label="Thème">
          {(["system","light","dark"] as const).map(t => (
            <Pressable key={t} onPress={() => update({ theme: t })}
              style={[styles.pill, { borderColor: theme.border, backgroundColor: settings.theme===t ? theme.primary : "transparent" }]}>
              <Text style={{ color: settings.theme===t ? theme.bg : theme.text }}>
                {t === "system" ? "Système" : t === "light" ? "Clair" : "Sombre"}
              </Text>
            </Pressable>
          ))}
        </Row>
        <Row label={`Taille du texte (${settings.fontSize}px)`}>
          <Pressable onPress={() => update({ fontSize: Math.max(14, settings.fontSize-1) })} style={[styles.pill, { borderColor: theme.border }]}><Text style={{ color: theme.text }}>A−</Text></Pressable>
          <Pressable onPress={() => update({ fontSize: Math.min(24, settings.fontSize+1) })} style={[styles.pill, { borderColor: theme.border }]}><Text style={{ color: theme.text }}>A+</Text></Pressable>
        </Row>
      </Section>

      <Section title="Données">
        <Pressable
          onPress={() => Alert.alert("Réinitialiser", "Effacer favoris, dernière lecture et paramètres ?", [
            { text: "Annuler", style: "cancel" },
            { text: "Effacer", style: "destructive", onPress: async () => { await clearAll(); router.back(); } },
          ])}
          style={[styles.pill, { borderColor: "#C44", alignSelf: "flex-start" }]}>
          <Text style={{ color: "#C44" }}>Réinitialiser les données</Text>
        </Pressable>
      </Section>

      <Section title="À propos">
        <Text style={{ color: theme.textMuted }}>Ma Bible — Louis Segond 1910 (domaine public).</Text>
        <Text style={{ color: theme.textMuted }}>Application 100% hors ligne.</Text>
      </Section>
    </View>
  );
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: theme.textMuted, fontSize: 12, fontWeight: "700", letterSpacing: 1 }}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
};
const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: theme.text }}>{label}</Text>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  pill: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
});
