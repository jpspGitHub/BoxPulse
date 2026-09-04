import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { StatCard } from "../../components/cards/StatCard";
import { AppScreen } from "../../components/layout/AppScreen";
import { WorkoutTimer } from "../../components/timer/WorkoutTimer";
import { Button } from "../../components/ui/Button";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";

export default function CoachTimerRoute() {
  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Cronometro"
        title="Configurar cronometro"
        description="Bolsa - 4 boxeadores"
      />
      <View style={styles.configGrid}>
        <StatCard label="Round" value="03:00" tone="accent" />
        <StatCard label="Descanso" value="01:00" />
        <StatCard label="Rounds" value="4" tone="success" />
        <StatCard label="Preparacion" value="00:15" />
      </View>
      <Surface style={styles.summary}>
        <SectionTitle>Participantes</SectionTitle>
        <Text style={styles.copy}>Martin Rodriguez, Sofia Pereira, Valentina Silva</Text>
      </Surface>
      <WorkoutTimer />
      <View style={styles.actions}>
        <Button
          label="Cancelar"
          onPress={() => router.replace("/coach")}
          variant="danger"
          style={styles.action}
        />
        <Button
          label="Finalizar"
          onPress={() => router.push("/coach/workout/workout-bag-rounds")}
          style={styles.action}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  configGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  },
  summary: {
    backgroundColor: colors.surfaceRaised
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  action: {
    flex: 1
  }
});
