import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Header, PrimaryButton, StatCard } from "../components/ui";
import { boxers, exerciseTypes } from "../data/mock-data";
import { styles } from "../styles/mobile-styles";
import type { AppScreen } from "../types/navigation";
import { formatSeconds } from "../utils/time";

export function ParticipantsScreen({
  selected,
  onToggle,
  onNext,
  onBack
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header
        eyebrow="Nuevo ejercicio"
        title="Seleccionar participantes"
        description={`${selected.length} boxeadores seleccionados`}
      />
      <TextInput placeholder="Buscar boxeador" placeholderTextColor="#7f8fa2" style={styles.input} />
      <View style={styles.section}>
        {boxers.map((boxer) => {
          const isSelected = selected.includes(boxer.id);

          return (
            <Pressable
              accessibilityRole="button"
              key={boxer.id}
              onPress={() => onToggle(boxer.id)}
              style={[styles.selectRow, isSelected && styles.selectRowActive]}
            >
              <View>
                <Text style={styles.rowTitle}>{boxer.name}</Text>
                <Text style={styles.rowMeta}>
                  {boxer.level} · {boxer.streak}
                </Text>
              </View>
              <Text style={[styles.check, isSelected && styles.checkActive]}>{isSelected ? "OK" : "+"}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.actionsRow}>
        <PrimaryButton label="Volver" onPress={onBack} variant="secondary" style={styles.splitButton} />
        <PrimaryButton
          disabled={selected.length === 0}
          label="Continuar"
          onPress={onNext}
          style={styles.splitButton}
        />
      </View>
    </ScrollView>
  );
}

export function ExerciseTypeScreen({ onNext, onBack }: { onNext: (type: string) => void; onBack: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="Nuevo ejercicio" title="Tipo de entrenamiento" description="Elegir foco principal." />
      <View style={styles.tileGrid}>
        {exerciseTypes.map((type) => (
          <Pressable accessibilityRole="button" key={type} onPress={() => onNext(type)} style={styles.tile}>
            <Text style={styles.tileText}>{type}</Text>
          </Pressable>
        ))}
      </View>
      <PrimaryButton label="Volver" onPress={onBack} variant="secondary" />
    </ScrollView>
  );
}

export function ExerciseModeScreen({
  exerciseType,
  onNext,
  onBack
}: {
  exerciseType: string;
  onNext: (screen: AppScreen) => void;
  onBack: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="Modalidad" title={exerciseType} description="Configurar como se va a ejecutar." />
      <Pressable accessibilityRole="button" onPress={() => onNext("timer-config")} style={styles.modeCard}>
        <Text style={styles.modeTitle}>Por cronometro</Text>
        <Text style={styles.modeText}>Rounds, descanso, preparacion y control en vivo.</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => onNext("repetition-config")} style={styles.modeCard}>
        <Text style={styles.modeTitle}>Por repeticiones</Text>
        <Text style={styles.modeText}>Series y objetivo de repeticiones por participante.</Text>
      </Pressable>
      <PrimaryButton label="Volver" onPress={onBack} variant="secondary" />
    </ScrollView>
  );
}

export function TimerConfigScreen({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="Cronometro" title="Configurar rounds" description="Valores iniciales del MVP." />
      <View style={styles.configGrid}>
        <StatCard label="Round" value="03:00" tone="warm" />
        <StatCard label="Descanso" value="01:00" />
        <StatCard label="Rounds" value="4" tone="green" />
        <StatCard label="Preparacion" value="00:15" />
      </View>
      <View style={styles.actionsRow}>
        <PrimaryButton label="Volver" onPress={onBack} variant="secondary" style={styles.splitButton} />
        <PrimaryButton label="Iniciar" onPress={onStart} style={styles.splitButton} />
      </View>
    </ScrollView>
  );
}

export function TimerRunScreen({ onFinish, onCancel }: { onFinish: () => void; onCancel: () => void }) {
  const [seconds, setSeconds] = useState(180);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const interval = setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="En ejecucion" title="Round 1 de 4" description="Bolsa · 4 participantes" />
      <View style={styles.timerPanel}>
        <Text style={styles.timerState}>ROUND</Text>
        <Text style={styles.timer}>{formatSeconds(seconds)}</Text>
        <Text style={styles.timerHint}>Descanso 01:00</Text>
      </View>
      <View style={styles.actionsRow}>
        <PrimaryButton
          label={isPaused ? "Continuar" : "Pausar"}
          onPress={() => setIsPaused((current) => !current)}
          style={styles.splitButton}
        />
        <PrimaryButton label="Siguiente" onPress={() => setSeconds(60)} variant="secondary" style={styles.splitButton} />
      </View>
      <View style={styles.actionsRow}>
        <PrimaryButton label="Cancelar" onPress={onCancel} variant="danger" style={styles.splitButton} />
        <PrimaryButton label="Finalizar" onPress={onFinish} style={styles.splitButton} />
      </View>
    </ScrollView>
  );
}

export function RepetitionConfigScreen({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="Repeticiones" title="Configurar objetivo" description="Carga simple para registro rapido." />
      <View style={styles.configGrid}>
        <StatCard label="Repeticiones" value="50" tone="warm" />
        <StatCard label="Series" value="4" tone="green" />
      </View>
      <View style={styles.actionsRow}>
        <PrimaryButton label="Volver" onPress={onBack} variant="secondary" style={styles.splitButton} />
        <PrimaryButton label="Iniciar" onPress={onStart} style={styles.splitButton} />
      </View>
    </ScrollView>
  );
}

export function RepetitionRunScreen({ onFinish, onCancel }: { onFinish: () => void; onCancel: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="En ejecucion" title="Serie 2 de 4" description="Objetivo 50 repeticiones" />
      <View style={styles.timerPanel}>
        <Text style={styles.timerState}>REPETICIONES</Text>
        <Text style={styles.timer}>50</Text>
        <Text style={styles.timerHint}>Marcar serie al completar</Text>
      </View>
      <PrimaryButton label="Marcar serie completa" onPress={() => undefined} />
      <View style={styles.actionsRow}>
        <PrimaryButton label="Cancelar" onPress={onCancel} variant="danger" style={styles.splitButton} />
        <PrimaryButton label="Finalizar" onPress={onFinish} style={styles.splitButton} />
      </View>
    </ScrollView>
  );
}

export function ExerciseSummaryScreen({ onDone }: { onDone: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Header eyebrow="Resumen" title="Ejercicio guardado" description="El resultado queda registrado como completado." />
      <View style={styles.section}>
        {["4 participantes", "4 rounds completados", "Notas pendientes de agregar"].map((item) => (
          <View key={item} style={styles.listRow}>
            <Text style={styles.rowTitle}>{item}</Text>
            <Text style={styles.badge}>OK</Text>
          </View>
        ))}
      </View>
      <PrimaryButton label="Volver al inicio" onPress={onDone} />
    </ScrollView>
  );
}
