import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { DataRow } from "../../components/cards/EntityRows";
import { StatCard } from "../../components/cards/StatCard";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, boxerTabs } from "../../components/layout/BottomTabs";
import { Button } from "../../components/ui/Button";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";
import { findBoxer, progressEntries, workouts } from "../../mocks/mobile-data";

const currentBoxer = findBoxer("martin");

export default function BoxerHomeRoute() {
  return (
    <AppScreen footer={<BottomTabs items={boxerTabs} />}>
      <ScreenHeader
        eyebrow="Boxer"
        title={`Hola, ${currentBoxer.fullName.split(" ")[0]}`}
        description="Resumen personal de entrenamientos, asistencia y progreso."
      />
      <View style={styles.stats}>
        <StatCard label="Asistencias mes" value={currentBoxer.attendanceThisMonth.toString()} tone="success" />
        <StatCard label="Peso actual" value={`${currentBoxer.currentWeightKg}`} tone="accent" />
      </View>
      <Surface>
        <SectionTitle>Programa activo</SectionTitle>
        <Text style={styles.title}>{currentBoxer.activeProgramName}</Text>
        <Text style={styles.copy}>Foco de la semana: tecnica defensiva y resistencia.</Text>
        <Button label="Ver programa" onPress={() => router.push("/boxer/program")} />
      </Surface>
      <Surface>
        <SectionTitle>Proximo workout</SectionTitle>
        <DataRow
          title={workouts[0]?.title ?? "Workout"}
          meta="Hoy · preparado por coach Nicolas"
          badge="listo"
          onPress={() => router.push("/boxer/workout/workout-bag-rounds")}
        />
      </Surface>
      <Surface>
        <SectionTitle>Ultimo progreso</SectionTitle>
        <Text style={styles.copy}>{progressEntries[0]?.notes}</Text>
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 12
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  }
});
