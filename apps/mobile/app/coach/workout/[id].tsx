import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { DataRow } from "../../../components/cards/EntityRows";
import { StatCard } from "../../../components/cards/StatCard";
import { AppScreen } from "../../../components/layout/AppScreen";
import { Button } from "../../../components/ui/Button";
import { Surface } from "../../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../../components/ui/Typography";
import { colors } from "../../../constants/theme";
import { findWorkout } from "../../../mocks/mobile-data";

export default function CoachWorkoutDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workout = findWorkout(id);

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Sesion"
        title={workout.title}
        description={`${workout.dateLabel} · ${workout.status} · ${workout.mode}`}
      />
      <View style={styles.stats}>
        <StatCard label="Duracion" value={workout.durationLabel} tone="accent" />
        <StatCard label="Participantes" value={workout.participants.length.toString()} tone="success" />
      </View>
      <Surface>
        <SectionTitle>Participantes</SectionTitle>
        {workout.participants.map((participant) => (
          <DataRow key={participant} title={participant} meta="Resultado registrado" badge="OK" />
        ))}
      </Surface>
      <Surface>
        <SectionTitle>Resultado</SectionTitle>
        <Text style={styles.copy}>
          {workout.mode === "timer"
            ? `${workout.rounds ?? 0} rounds completados con control por cronometro.`
            : `${workout.reps ?? 0} repeticiones registradas.`}
        </Text>
        <TextInput
          multiline
          placeholder="Agregar observaciones de la sesion"
          placeholderTextColor={colors.muted}
          style={styles.textArea}
        />
        <Button label="Guardar observaciones" onPress={() => undefined} />
      </Surface>
      <Button label="Volver" onPress={() => router.back()} variant="secondary" />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 12
  },
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  },
  textArea: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    minHeight: 96,
    padding: 14,
    textAlignVertical: "top"
  }
});

