import { router } from "expo-router";
import { StyleSheet, TextInput } from "react-native";

import { DataRow } from "../../components/cards/EntityRows";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, coachTabs } from "../../components/layout/BottomTabs";
import { ScreenHeader } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";
import { boxers } from "../../mocks/mobile-data";

export default function CoachBoxersRoute() {
  return (
    <AppScreen footer={<BottomTabs items={coachTabs} />}>
      <ScreenHeader eyebrow="Seguimiento" title="Boxeadores" description="Asignados al gimnasio y actividad reciente." />
      <TextInput placeholder="Buscar boxeador" placeholderTextColor={colors.muted} style={styles.input} />
      {boxers.map((boxer) => (
        <DataRow
          key={boxer.id}
          title={boxer.fullName}
          meta={`${boxer.attendanceThisMonth} asistencias · ${boxer.activeProgramName}`}
          badge={boxer.progressTrend}
          onPress={() => router.push(`/coach/boxer/${boxer.id}`)}
        />
      ))}
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
  }
});
