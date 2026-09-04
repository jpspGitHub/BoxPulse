import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";

import { DataRow } from "../../../components/cards/EntityRows";
import { StatCard } from "../../../components/cards/StatCard";
import { AppScreen } from "../../../components/layout/AppScreen";
import { Button } from "../../../components/ui/Button";
import { Surface } from "../../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../../components/ui/Typography";
import { colors } from "../../../constants/theme";
import { coachNotes, findBoxer, progressEntries, workouts } from "../../../mocks/mobile-data";

export default function CoachBoxerDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const boxer = findBoxer(id);

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Detalle boxer"
        title={boxer.fullName}
        description={`${boxer.activeProgramName} · ultima actividad ${boxer.lastWorkoutAt}`}
      />
      <View style={styles.stats}>
        <StatCard label="Asistencias mes" value={boxer.attendanceThisMonth.toString()} tone="success" />
        <StatCard label="Peso actual" value={`${boxer.currentWeightKg}`} tone="accent" />
      </View>
      <Surface>
        <SectionTitle>Progreso fisico</SectionTitle>
        {progressEntries.slice(0, 2).map((entry) => (
          <DataRow
            key={entry.id}
            title={`${entry.weightKg} kg · cintura ${entry.waistCm} cm`}
            meta={`${entry.dateLabel} · ${entry.notes}`}
            badge={entry.bodyFatPercentage ? `${entry.bodyFatPercentage}%` : undefined}
          />
        ))}
      </Surface>
      <Surface>
        <SectionTitle>Historial de entrenamientos</SectionTitle>
        {workouts.slice(0, 2).map((workout) => (
          <DataRow
            key={workout.id}
            title={workout.title}
            meta={`${workout.dateLabel} · ${workout.durationLabel}`}
            badge={workout.mode}
            onPress={() => router.push(`/coach/workout/${workout.id}`)}
          />
        ))}
      </Surface>
      <Surface>
        <SectionTitle>Observaciones</SectionTitle>
        {coachNotes.map((note) => (
          <DataRow key={note.id} title={note.text} meta={note.dateLabel} />
        ))}
        <TextInput
          multiline
          placeholder="Registrar observacion del coach"
          placeholderTextColor={colors.muted}
          style={styles.textArea}
        />
        <Button label="Guardar observacion" onPress={() => undefined} />
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
