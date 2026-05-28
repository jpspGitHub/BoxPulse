import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { DataRow } from "../../components/cards/EntityRows";
import { StatCard } from "../../components/cards/StatCard";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, coachTabs } from "../../components/layout/BottomTabs";
import { Button } from "../../components/ui/Button";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";
import { boxers, workouts } from "../../mocks/mobile-data";

export default function CoachHomeRoute() {
  return (
    <AppScreen footer={<BottomTabs items={coachTabs} />}>
      <ScreenHeader
        eyebrow="Coach"
        title="Hola, Coach Nicolas"
        description="Ready for today's session."
      />
      <View style={styles.stats}>
        <StatCard label="Boxers activos" value={boxers.length.toString()} tone="accent" />
        <StatCard label="Entrenos hoy" value="7" tone="success" />
      </View>
      <Surface style={styles.classCard}>
        <Text style={styles.kicker}>Proxima clase</Text>
        <Text style={styles.classTitle}>Sparring avanzado</Text>
        <Text style={styles.cardCopy}>18:00 hrs - Ring 1</Text>
      </Surface>
      <Button label="Iniciar ejercicio" onPress={() => router.push("/coach/workout/new")} />
      <Surface>
        <View style={styles.sectionRow}>
          <SectionTitle>Ultimos entrenamientos</SectionTitle>
          <Text style={styles.linkText}>Ver todos</Text>
        </View>
        {workouts.map((workout) => (
          <DataRow
            key={workout.id}
            title={workout.title}
            meta={`${workout.dateLabel} · ${workout.durationLabel} · ${workout.participants.length} participantes`}
            badge="OK"
            onPress={() => router.push(`/coach/workout/${workout.id}`)}
          />
        ))}
      </Surface>
      <Surface>
        <Text style={styles.sectionKicker}>Boxeadores recientes</Text>
        <Text style={styles.cardTitle}>Mateo R. / Sofia L.</Text>
        <Text style={styles.cardCopy}>
          Martin bajo 1.4 kg este mes y Sofia completo 15 asistencias.
        </Text>
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 12
  },
  classCard: {
    minHeight: 150,
    justifyContent: "flex-end"
  },
  kicker: {
    color: colors.subtext,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 3,
    textTransform: "uppercase"
  },
  classTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900"
  },
  sectionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkText: {
    color: colors.primarySoft,
    fontSize: 16,
    fontWeight: "900"
  },
  sectionKicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  cardCopy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  }
});
