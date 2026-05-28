import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { DataRow } from "../../../components/cards/EntityRows";
import { StatCard } from "../../../components/cards/StatCard";
import { AppScreen } from "../../../components/layout/AppScreen";
import { Button } from "../../../components/ui/Button";
import { Badge, Surface } from "../../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../../components/ui/Typography";
import { colors } from "../../../constants/theme";
import { exerciseLabels, findProgram } from "../../../mocks/mobile-data";

export default function CoachProgramDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const program = findProgram(id);

  return (
    <AppScreen>
      <ScreenHeader eyebrow="Programa" title={program.name} description={program.description} />
      <View style={styles.stats}>
        <StatCard label="Sesiones" value={program.sessions.length.toString()} tone="accent" />
        <StatCard label="Asignados" value={program.assignedBoxers.toString()} tone="success" />
      </View>
      <Surface>
        <View style={styles.inlineHeader}>
          <SectionTitle>Estado</SectionTitle>
          <Badge label={program.status} tone="accent" />
        </View>
        <Text style={styles.copy}>Nivel {program.level}. Los bloques se muestran en el orden definido por el coach.</Text>
      </Surface>
      {program.sessions.map((session) => (
        <Surface key={session.id}>
          <SectionTitle>{session.order}. {session.title}</SectionTitle>
          <Text style={styles.copy}>{session.description}</Text>
          {session.blocks.map((block) => (
            <DataRow
              key={block.id}
              title={block.title}
              meta={`${exerciseLabels[block.type]} · ${block.durationMinutes} min · ${block.description}`}
              badge={block.coachNotes ? "nota" : undefined}
            />
          ))}
        </Surface>
      ))}
      <Button label="Iniciar sesion" onPress={() => router.push(`/coach/workout/${program.sessions[0]?.id ?? "new"}`)} />
      <Button label="Volver" onPress={() => router.back()} variant="secondary" />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 12
  },
  inlineHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  }
});

