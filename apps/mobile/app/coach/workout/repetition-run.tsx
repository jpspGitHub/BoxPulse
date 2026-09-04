import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../../components/layout/AppScreen";
import { Button } from "../../../components/ui/Button";
import { Surface } from "../../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../../components/ui/Typography";
import { colors } from "../../../constants/theme";

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function CoachRepetitionRunRoute() {
  const [elapsed, setElapsed] = useState(0);
  const [series, setSeries] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((current) => current + 1), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Meta: 50 repeticiones"
        title="Abdominales"
        description="Objetivo por participante"
      />
      <View style={styles.panel}>
        <Text style={styles.state}>TIEMPO TRANSCURRIDO</Text>
        <Text style={styles.reps}>50</Text>
        <Text style={styles.hint}>
          Serie {series} de 4 · {formatElapsed(elapsed)}
        </Text>
      </View>
      <Surface>
        <SectionTitle>Participantes</SectionTitle>
        <Text style={styles.copy}>Martin Rodriguez, Lucas Cabrera</Text>
      </Surface>
      <Button
        label="Marcar serie completa"
        onPress={() => setSeries((current) => Math.min(4, current + 1))}
      />
      <Button label="Reiniciar timer" onPress={() => setElapsed(0)} variant="secondary" />
      <View style={styles.actions}>
        <Button
          label="Cancelar"
          onPress={() => router.replace("/coach")}
          variant="danger"
          style={styles.action}
        />
        <Button
          label="Finalizar"
          onPress={() => router.push("/coach/workout/workout-jump-rope")}
          style={styles.action}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 4,
    padding: 28
  },
  state: {
    color: colors.primarySoft,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 6
  },
  reps: {
    color: colors.text,
    fontSize: 100,
    fontWeight: "900",
    lineHeight: 94
  },
  hint: {
    color: colors.subtext,
    fontSize: 16,
    fontWeight: "800"
  },
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  action: {
    flex: 1
  }
});
