import { ScrollView, Text, TextInput, View } from "react-native";

import { boxerHistory, boxerProfileRows } from "../data/mock-data";
import { styles } from "../styles/mobile-styles";
import type { AppScreen } from "../types/navigation";
import { BottomNav, Header, PrimaryButton, StatCard } from "../components/ui";

const boxerNavItems: Array<{ key: AppScreen; label: string }> = [
  { key: "boxer-home", label: "Inicio" },
  { key: "boxer-history", label: "Historial" },
  { key: "boxer-progress", label: "Progreso" },
  { key: "boxer-profile", label: "Perfil" }
];

function BoxerNav({ active, onSelect }: { active: AppScreen; onSelect: (screen: AppScreen) => void }) {
  return <BottomNav active={active} items={boxerNavItems} onSelect={onSelect} />;
}

export function BoxerHome({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Boxer" title="Tu progreso" description="Resumen personal de entrenamientos y asistencia." />
        <View style={styles.statsGrid}>
          <StatCard label="Asistencias mes" value="12" tone="green" />
          <StatCard label="Entrenos completos" value="31" tone="warm" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proximo foco</Text>
          <Text style={styles.rowTitle}>Tecnica defensiva y resistencia</Text>
          <Text style={styles.rowMeta}>Asignado por coach Nicolas</Text>
        </View>
      </ScrollView>
      <BoxerNav active="boxer-home" onSelect={onSelect} />
    </>
  );
}

export function BoxerHistory({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Historial" title="Entrenamientos" description="Actividad completada y asistencia." />
        {boxerHistory.map((item) => (
          <View key={item} style={styles.listRow}>
            <View>
              <Text style={styles.rowTitle}>{item}</Text>
              <Text style={styles.rowMeta}>Completado esta semana</Text>
            </View>
            <Text style={styles.badge}>100%</Text>
          </View>
        ))}
      </ScrollView>
      <BoxerNav active="boxer-history" onSelect={onSelect} />
    </>
  );
}

export function BoxerProgress({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Metricas" title="Evolucion fisica" description="Peso, medidas y notas de progreso." />
        <View style={styles.configGrid}>
          <StatCard label="Peso actual" value="76.2" tone="warm" />
          <StatCard label="Cambio mes" value="-1.4" tone="green" />
          <StatCard label="Asistencia" value="86%" />
          <StatCard label="Carga" value="+12%" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nueva entrada</Text>
          <TextInput placeholder="Peso" placeholderTextColor="#7f8fa2" style={styles.input} />
          <TextInput placeholder="Notas" placeholderTextColor="#7f8fa2" style={styles.input} />
          <PrimaryButton label="Guardar progreso" onPress={() => undefined} />
        </View>
      </ScrollView>
      <BoxerNav active="boxer-progress" onSelect={onSelect} />
    </>
  );
}

export function BoxerProfile({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Perfil" title="Martin Rodriguez" description="Datos personales y cuenta." />
        <View style={styles.section}>
          {boxerProfileRows.map((item) => (
            <View key={item} style={styles.listRow}>
              <Text style={styles.rowTitle}>{item}</Text>
            </View>
          ))}
        </View>
        <PrimaryButton label="Cambiar password" onPress={() => undefined} variant="secondary" />
      </ScrollView>
      <BoxerNav active="boxer-profile" onSelect={onSelect} />
    </>
  );
}
