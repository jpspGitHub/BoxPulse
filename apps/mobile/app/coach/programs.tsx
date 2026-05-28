import { router } from "expo-router";

import { DataRow } from "../../components/cards/EntityRows";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, coachTabs } from "../../components/layout/BottomTabs";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { trainingPrograms } from "../../mocks/mobile-data";

export default function CoachProgramsRoute() {
  return (
    <AppScreen footer={<BottomTabs items={coachTabs} />}>
      <ScreenHeader eyebrow="Programas" title="Planes activos" description="Sesiones y bloques listos para asignar." />
      <Surface>
        <SectionTitle>Programas</SectionTitle>
        {trainingPrograms.map((program) => (
          <DataRow
            key={program.id}
            title={program.name}
            meta={`${program.sessions.length} sesiones · ${program.assignedBoxers} asignados · ${program.level}`}
            badge={program.status}
            onPress={() => router.push(`/coach/program/${program.id}`)}
          />
        ))}
      </Surface>
    </AppScreen>
  );
}

