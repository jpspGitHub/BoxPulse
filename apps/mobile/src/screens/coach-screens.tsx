import { ScrollView, Text, View } from "react-native";

import { boxers, coachActivity, trainingPrograms } from "../data/mock-data";
import { styles } from "../styles/mobile-styles";
import type { AppScreen } from "../types/navigation";
import { BottomNav, Header, PrimaryButton, StatCard } from "../components/ui";

const coachNavItems: Array<{ key: AppScreen; label: string }> = [
  { key: "coach-home", label: "Inicio" },
  { key: "coach-boxers", label: "Boxers" },
  { key: "programs", label: "Planes" }
];

export function CoachHome({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header
          eyebrow="Coach"
          title="Hoy en RoundLab"
          description="Operacion rapida para entrenar, registrar y seguir boxeadores."
        />
        <View style={styles.statsGrid}>
          <StatCard label="Boxeadores activos" value="24" tone="warm" />
          <StatCard label="Entrenos hoy" value="7" tone="green" />
        </View>
        <PrimaryButton label="Iniciar ejercicio" onPress={() => onSelect("participants")} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>
          {coachActivity.map((item) => (
            <View key={item} style={styles.listRow}>
              <View>
                <Text style={styles.rowTitle}>{item}</Text>
                <Text style={styles.rowMeta}>Registrado hoy</Text>
              </View>
              <Text style={styles.badge}>OK</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNav active="coach-home" items={coachNavItems} onSelect={onSelect} />
    </>
  );
}

export function CoachBoxersScreen({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Seguimiento" title="Boxeadores" description="Estado deportivo y asistencia reciente." />
        {boxers.map((boxer) => (
          <View key={boxer.id} style={styles.listRow}>
            <View>
              <Text style={styles.rowTitle}>{boxer.name}</Text>
              <Text style={styles.rowMeta}>
                {boxer.level} · {boxer.streak}
              </Text>
            </View>
            <Text style={styles.badge}>Ver</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNav active="coach-boxers" items={coachNavItems} onSelect={onSelect} />
    </>
  );
}

export function ProgramsScreen({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Programas" title="Planes activos" description="Sesiones y bloques listos para asignar." />
        {trainingPrograms.map((program, index) => (
          <View key={program} style={styles.modeCard}>
            <Text style={styles.modeTitle}>{program}</Text>
            <Text style={styles.modeText}>{index + 3} sesiones · Nivel intermedio</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNav active="programs" items={coachNavItems} onSelect={onSelect} />
    </>
  );
}
