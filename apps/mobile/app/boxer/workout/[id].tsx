import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DataRow } from "../../../components/cards/EntityRows";
import { AppScreen } from "../../../components/layout/AppScreen";
import { Button } from "../../../components/ui/Button";
import { Surface } from "../../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../../components/ui/Typography";
import { colors } from "../../../constants/theme";
import { findWorkout } from "../../../mocks/mobile-data";

export default function BoxerWorkoutRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workout = findWorkout(id);
  const [completedBlocks, setCompletedBlocks] = useState<string[]>(["warmup"]);

  function toggleBlock(blockId: string) {
    setCompletedBlocks((current) =>
      current.includes(blockId) ? current.filter((item) => item !== blockId) : [...current, blockId]
    );
  }

  return (
    <AppScreen>
      <ScreenHeader eyebrow="Workout" title={workout.title} description="Ejecucion mock del programa activo." />
      <View style={styles.panel}>
        <Text style={styles.state}>EN CURSO</Text>
        <Text style={styles.timer}>24:00</Text>
        <Text style={styles.hint}>{workout.durationLabel} estimados</Text>
      </View>
      <Surface>
        <SectionTitle>Bloques</SectionTitle>
        {[
          { id: "warmup", title: "Entrada en calor", meta: "Comba suave · 8 min" },
          { id: "main", title: "Bolsa tecnica", meta: "Jab, cross y salida lateral" },
          { id: "core", title: "Core", meta: "Plancha y abdominales" }
        ].map((block) => (
          <DataRow
            key={block.id}
            title={block.title}
            meta={block.meta}
            badge={completedBlocks.includes(block.id) ? "OK" : "pendiente"}
            onPress={() => toggleBlock(block.id)}
          />
        ))}
      </Surface>
      <View style={styles.actions}>
        <Button label="Cancelar" onPress={() => router.back()} variant="secondary" style={styles.action} />
        <Button label="Completar" onPress={() => router.replace("/boxer/history")} style={styles.action} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.accent,
    borderRadius: 8,
    borderWidth: 1,
    padding: 28
  },
  state: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "900"
  },
  timer: {
    color: colors.text,
    fontSize: 74,
    fontWeight: "900",
    lineHeight: 84
  },
  hint: {
    color: colors.subtext,
    fontSize: 16,
    fontWeight: "800"
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  action: {
    flex: 1
  }
});
