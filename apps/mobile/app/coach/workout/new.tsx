import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from "../../../components/ui/Button";
import { PressableSurface, Surface } from "../../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../../components/ui/Typography";
import { AppScreen } from "../../../components/layout/AppScreen";
import { colors } from "../../../constants/theme";
import { boxers, exerciseTypes } from "../../../mocks/mobile-data";
import type { ExerciseMode, ExerciseType } from "../../../types/domain";

export default function CoachNewWorkoutRoute() {
  const [selectedBoxers, setSelectedBoxers] = useState<string[]>([]);
  const [exerciseType, setExerciseType] = useState<ExerciseType>("bag_work");
  const [mode, setMode] = useState<ExerciseMode>("timer");

  function toggleBoxer(id: string) {
    setSelectedBoxers((current) => (current.includes(id) ? current.filter((boxerId) => boxerId !== id) : [...current, id]));
  }

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Nuevo ejercicio"
        title="Configurar sesion"
        description={`${selectedBoxers.length} participantes seleccionados`}
      />
      <TextInput placeholder="Buscar boxeador" placeholderTextColor={colors.muted} style={styles.input} />
      <Surface>
        <SectionTitle>Participantes</SectionTitle>
        {boxers.map((boxer) => (
          <PressableSurface
            key={boxer.id}
            onPress={() => toggleBoxer(boxer.id)}
            selected={selectedBoxers.includes(boxer.id)}
            style={styles.option}
          >
            <View>
              <Text style={styles.optionTitle}>{boxer.fullName}</Text>
              <Text style={styles.optionMeta}>{boxer.attendanceThisMonth} asistencias este mes</Text>
            </View>
            <Text style={styles.check}>{selectedBoxers.includes(boxer.id) ? "OK" : "+"}</Text>
          </PressableSurface>
        ))}
      </Surface>
      <Surface>
        <SectionTitle>Tipo de entrenamiento</SectionTitle>
        <View style={styles.grid}>
          {exerciseTypes.map((type) => (
            <PressableSurface
              key={type.id}
              onPress={() => setExerciseType(type.id)}
              selected={exerciseType === type.id}
              style={styles.tile}
            >
              <Text style={styles.optionTitle}>{type.label}</Text>
            </PressableSurface>
          ))}
        </View>
      </Surface>
      <Surface>
        <SectionTitle>Modalidad</SectionTitle>
        <PressableSurface onPress={() => setMode("timer")} selected={mode === "timer"}>
          <Text style={styles.optionTitle}>Por cronometro</Text>
          <Text style={styles.optionMeta}>Rounds, descanso, preparacion y control en vivo.</Text>
        </PressableSurface>
        <PressableSurface onPress={() => setMode("repetitions")} selected={mode === "repetitions"}>
          <Text style={styles.optionTitle}>Por repeticiones</Text>
          <Text style={styles.optionMeta}>Series y objetivo de repeticiones por participante.</Text>
        </PressableSurface>
      </Surface>
      <View style={styles.actions}>
        <Button label="Cancelar" onPress={() => router.back()} variant="secondary" style={styles.action} />
        <Button
          label={mode === "timer" ? "Configurar timer" : "Iniciar reps"}
          disabled={selectedBoxers.length === 0}
          onPress={() => (mode === "timer" ? router.push("/coach/timer") : router.push("/coach/workout/repetition-run"))}
          style={styles.action}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14
  },
  option: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  optionMeta: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  },
  check: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "900"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  tile: {
    minHeight: 72,
    width: "47%"
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  action: {
    flex: 1
  }
});

