import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { DataRow } from "../../components/cards/EntityRows";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, boxerTabs } from "../../components/layout/BottomTabs";
import { Button } from "../../components/ui/Button";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";
import { exerciseLabels, findProgram } from "../../mocks/mobile-data";

const activeProgram = findProgram("base-tecnica");

export default function BoxerProgramRoute() {
  return (
    <AppScreen footer={<BottomTabs items={boxerTabs} />}>
      <ScreenHeader eyebrow="Programa activo" title={activeProgram.name} description={activeProgram.description} />
      {activeProgram.sessions.map((session) => (
        <Surface key={session.id}>
          <SectionTitle>{session.title}</SectionTitle>
          <Text style={styles.copy}>{session.description}</Text>
          {session.blocks.map((block) => (
            <DataRow
              key={block.id}
              title={block.title}
              meta={`${exerciseLabels[block.type]} · ${block.durationMinutes} min`}
              badge="pendiente"
            />
          ))}
        </Surface>
      ))}
      <Button label="Ejecutar workout" onPress={() => router.push("/boxer/workout/workout-bag-rounds")} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22
  }
});

