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
        description="Listos para el siguiente round."
      />
      <Surface style={styles.heroCard}>
        <Text style={styles.pill}>Siguiente sesion</Text>
        <Text style={styles.heroTitle}>Sparring tactico</Text>
        <Text style={styles.copy}>Semana 3 / Dia 2 - 60 Minutos</Text>
        <Button
          label="Iniciar entrenamiento"
          onPress={() => router.push("/boxer/workout/workout-bag-rounds")}
        />
      </Surface>
      <DataRow
        title="Registrar progreso"
        meta="Peso, medidas y observaciones"
        badge=">"
        onPress={() => router.push("/boxer/progress")}
      />
      <DataRow
        title="Ver estadisticas"
        meta="KPIs, actividad semanal y distribucion"
        badge=">"
        onPress={() => router.push("/boxer/progress")}
      />
      <View style={styles.stats}>
        <StatCard
          label="Asistencias mes"
          value={currentBoxer.attendanceThisMonth.toString()}
          tone="success"
        />
        <StatCard label="Peso actual" value={`${currentBoxer.currentWeightKg}`} tone="accent" />
      </View>
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
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 12
  },
  heroCard: {
    gap: 18,
    minHeight: 280
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 6,
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 3,
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingVertical: 10,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 48,
    textTransform: "uppercase"
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
