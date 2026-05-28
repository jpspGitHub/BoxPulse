import { StyleSheet, Text, TextInput, View } from "react-native";

import { DataRow } from "../../components/cards/EntityRows";
import { StatCard } from "../../components/cards/StatCard";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, boxerTabs } from "../../components/layout/BottomTabs";
import { Button } from "../../components/ui/Button";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";
import { progressEntries } from "../../mocks/mobile-data";

export default function BoxerProgressRoute() {
  return (
    <AppScreen footer={<BottomTabs items={boxerTabs} />}>
      <ScreenHeader eyebrow="Progreso" title="Evolucion fisica" description="Peso, medidas y relacion con actividad." />
      <View style={styles.stats}>
        <StatCard label="Peso actual" value="76.2" tone="accent" />
        <StatCard label="Cambio mes" value="-1.4" tone="success" />
      </View>
      <Surface>
        <SectionTitle>Analisis simple</SectionTitle>
        <View style={styles.chart}>
          <View style={[styles.bar, { height: 70 }]} />
          <View style={[styles.bar, { height: 88 }]} />
          <View style={[styles.bar, { height: 56 }]} />
          <View style={[styles.bar, { height: 100 }]} />
        </View>
        <Text style={styles.copy}>Mas asistencia semanal se refleja en mejor estabilidad de peso.</Text>
      </Surface>
      <Surface>
        <SectionTitle>Registrar progreso</SectionTitle>
        <TextInput placeholder="Peso" placeholderTextColor={colors.muted} style={styles.input} />
        <TextInput placeholder="Cintura" placeholderTextColor={colors.muted} style={styles.input} />
        <TextInput placeholder="Notas" placeholderTextColor={colors.muted} style={styles.input} />
        <Button label="Guardar progreso" onPress={() => undefined} />
      </Surface>
      <Surface>
        <SectionTitle>Historial</SectionTitle>
        {progressEntries.map((entry) => (
          <DataRow
            key={entry.id}
            title={`${entry.weightKg} kg · cintura ${entry.waistCm} cm`}
            meta={`${entry.dateLabel} · ${entry.notes}`}
            badge={entry.bodyFatPercentage ? `${entry.bodyFatPercentage}%` : undefined}
          />
        ))}
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 12
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 12,
    height: 112
  },
  bar: {
    backgroundColor: colors.accent,
    borderRadius: 6,
    flex: 1
  },
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14
  }
});

