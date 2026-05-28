import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { DataRow } from "../../components/cards/EntityRows";
import { StatCard } from "../../components/cards/StatCard";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, boxerTabs } from "../../components/layout/BottomTabs";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { workouts } from "../../mocks/mobile-data";

export default function BoxerHistoryRoute() {
  return (
    <AppScreen footer={<BottomTabs items={boxerTabs} />}>
      <ScreenHeader
        eyebrow="Workout vault"
        title="Historial"
        description="Review your past sessions and track your grind."
      />
      <View style={styles.stats}>
        <StatCard label="Current streak" value="12" tone="success" />
        <StatCard label="Records" value="3" tone="accent" />
      </View>
      <Surface>
        <SectionTitle>Ejercicios recientes</SectionTitle>
        {workouts.map((workout) => (
          <DataRow
            key={workout.id}
            title={workout.title}
            meta={`${workout.dateLabel} · ${workout.durationLabel}`}
            badge={workout.mode}
            onPress={() => router.push(`/boxer/workout/${workout.id}`)}
          />
        ))}
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 12
  }
});
