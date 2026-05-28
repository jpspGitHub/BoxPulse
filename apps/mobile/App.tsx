import { BOXPULSE_APP_NAME } from "@boxpulse/shared/constants";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle
} from "react-native";

import { AuthSessionProvider } from "./lib/auth-session";
import { MobileRoleGuard, type MobileAppRole } from "./lib/mobile-role-guard";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";

type AppScreen =
  | "coach-home"
  | "participants"
  | "exercise-type"
  | "exercise-mode"
  | "timer-config"
  | "timer-run"
  | "repetition-config"
  | "repetition-run"
  | "exercise-summary"
  | "coach-boxers"
  | "programs"
  | "boxer-home"
  | "boxer-history"
  | "boxer-progress"
  | "boxer-profile";

const boxers = [
  { id: "martin", name: "Martin Rodriguez", level: "Intermedio", streak: "12 asistencias" },
  { id: "sofia", name: "Sofia Pereira", level: "Avanzado", streak: "8 asistencias" },
  { id: "lucas", name: "Lucas Cabrera", level: "Principiante", streak: "4 asistencias" },
  { id: "valen", name: "Valentina Silva", level: "Intermedio", streak: "10 asistencias" }
];

const exerciseTypes = [
  "Bolsa",
  "Sparring",
  "Abdominales",
  "Comba",
  "Sombra",
  "Manoplas",
  "Tecnica defensiva",
  "Resistencia",
  "Fuerza",
  "Personalizado"
];

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainder}`;
}

function ScreenFrame({ children }: { children: ReactNode }) {
  return (
    <View style={styles.shell}>
      <StatusBar style="light" />
      {children}
    </View>
  );
}

function Header({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {action}
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  disabled,
  variant = "primary",
  style
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        variant === "danger" && styles.dangerButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
        style
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "secondary" && styles.secondaryButtonText,
          variant === "danger" && styles.dangerButtonText
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "warm" | "green" }) {
  return (
    <View style={[styles.statCard, tone === "warm" && styles.statCardWarm, tone === "green" && styles.statCardGreen]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function BottomNav({
  items,
  active,
  onSelect
}: {
  items: Array<{ key: AppScreen; label: string }>;
  active: AppScreen;
  onSelect: (screen: AppScreen) => void;
}) {
  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <Pressable
          accessibilityRole="button"
          key={item.key}
          onPress={() => onSelect(item.key)}
          style={[styles.navItem, active === item.key && styles.navItemActive]}
        >
          <Text style={[styles.navItemText, active === item.key && styles.navItemTextActive]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function LoginScreen({ onContinue }: { onContinue: () => void }) {
  const [email, setEmail] = useState("coach@boxpulse.app");
  const [password, setPassword] = useState("boxpulse");

  return (
    <ScreenFrame>
      <View style={styles.loginHero}>
        <Text style={styles.brand}>{BOXPULSE_APP_NAME}</Text>
        <Text style={styles.loginTitle}>Entrenamientos claros, progreso visible.</Text>
        <Text style={styles.loginText}>Acceso de validacion para recorrer las pantallas del MVP.</Text>
      </View>
      <View style={styles.formPanel}>
        <TextInput
          autoCapitalize="none"
          inputMode="email"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#7f8fa2"
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#7f8fa2"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <PrimaryButton label="Ingresar" onPress={onContinue} />
      </View>
    </ScreenFrame>
  );
}

function CoachHome({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
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
          {["Bolsa por rounds - 4 participantes", "Comba por repeticiones - Sofia", "Sparring tecnico - Martin y Lucas"].map(
            (item) => (
              <View key={item} style={styles.listRow}>
                <View>
                  <Text style={styles.rowTitle}>{item}</Text>
                  <Text style={styles.rowMeta}>Registrado hoy</Text>
                </View>
                <Text style={styles.badge}>OK</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
      <BottomNav
        active="coach-home"
        items={[
          { key: "coach-home", label: "Inicio" },
          { key: "coach-boxers", label: "Boxers" },
          { key: "programs", label: "Planes" }
        ]}
        onSelect={onSelect}
      />
    </>
  );
}

function ParticipantsScreen({
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

function ExerciseTypeScreen({ onNext, onBack }: { onNext: (type: string) => void; onBack: () => void }) {
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

function ExerciseModeScreen({ exerciseType, onNext, onBack }: { exerciseType: string; onNext: (screen: AppScreen) => void; onBack: () => void }) {
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

function TimerConfigScreen({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
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

function TimerRunScreen({ onFinish, onCancel }: { onFinish: () => void; onCancel: () => void }) {
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

function RepetitionConfigScreen({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
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

function RepetitionRunScreen({ onFinish, onCancel }: { onFinish: () => void; onCancel: () => void }) {
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

function ExerciseSummaryScreen({ onDone }: { onDone: () => void }) {
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

function CoachBoxersScreen({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
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
      <BottomNav
        active="coach-boxers"
        items={[
          { key: "coach-home", label: "Inicio" },
          { key: "coach-boxers", label: "Boxers" },
          { key: "programs", label: "Planes" }
        ]}
        onSelect={onSelect}
      />
    </>
  );
}

function ProgramsScreen({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Programas" title="Planes activos" description="Sesiones y bloques listos para asignar." />
        {["Base tecnica 4 semanas", "Condicionamiento competitivo", "Fuerza y core"].map((program, index) => (
          <View key={program} style={styles.modeCard}>
            <Text style={styles.modeTitle}>{program}</Text>
            <Text style={styles.modeText}>{index + 3} sesiones · Nivel intermedio</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNav
        active="programs"
        items={[
          { key: "coach-home", label: "Inicio" },
          { key: "coach-boxers", label: "Boxers" },
          { key: "programs", label: "Planes" }
        ]}
        onSelect={onSelect}
      />
    </>
  );
}

function BoxerHome({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
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
      <BottomNav
        active="boxer-home"
        items={[
          { key: "boxer-home", label: "Inicio" },
          { key: "boxer-history", label: "Historial" },
          { key: "boxer-progress", label: "Progreso" },
          { key: "boxer-profile", label: "Perfil" }
        ]}
        onSelect={onSelect}
      />
    </>
  );
}

function BoxerHistory({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Historial" title="Entrenamientos" description="Actividad completada y asistencia." />
        {["Bolsa por cronometro", "Comba por repeticiones", "Manoplas tecnica"].map((item) => (
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

function BoxerProgress({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
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

function BoxerProfile({ onSelect }: { onSelect: (screen: AppScreen) => void }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <Header eyebrow="Perfil" title="Martin Rodriguez" description="Datos personales y cuenta." />
        <View style={styles.section}>
          {["Email: martin@roundlab.com", "Telefono: +598 99 000 111", "Nivel: Intermedio"].map((item) => (
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

function BoxerNav({ active, onSelect }: { active: AppScreen; onSelect: (screen: AppScreen) => void }) {
  return (
    <BottomNav
      active={active}
      items={[
        { key: "boxer-home", label: "Inicio" },
        { key: "boxer-history", label: "Historial" },
        { key: "boxer-progress", label: "Progreso" },
        { key: "boxer-profile", label: "Perfil" }
      ]}
      onSelect={onSelect}
    />
  );
}

function AppContent({ role }: { role: MobileAppRole }) {
  const initialScreen = useMemo<AppScreen>(() => (role === "coach" ? "coach-home" : "boxer-home"), [role]);
  const [screen, setScreen] = useState<AppScreen>(initialScreen);
  const [selectedBoxers, setSelectedBoxers] = useState<string[]>([]);
  const [exerciseType, setExerciseType] = useState("Bolsa");

  function toggleBoxer(id: string) {
    setSelectedBoxers((current) =>
      current.includes(id) ? current.filter((boxerId) => boxerId !== id) : [...current, id]
    );
  }

  if (screen === "participants") {
    return (
      <ScreenFrame>
        <ParticipantsScreen
          selected={selectedBoxers}
          onBack={() => setScreen("coach-home")}
          onNext={() => setScreen("exercise-type")}
          onToggle={toggleBoxer}
        />
      </ScreenFrame>
    );
  }

  if (screen === "exercise-type") {
    return (
      <ScreenFrame>
        <ExerciseTypeScreen
          onBack={() => setScreen("participants")}
          onNext={(type) => {
            setExerciseType(type);
            setScreen("exercise-mode");
          }}
        />
      </ScreenFrame>
    );
  }

  if (screen === "exercise-mode") {
    return (
      <ScreenFrame>
        <ExerciseModeScreen
          exerciseType={exerciseType}
          onBack={() => setScreen("exercise-type")}
          onNext={setScreen}
        />
      </ScreenFrame>
    );
  }

  if (screen === "timer-config") {
    return (
      <ScreenFrame>
        <TimerConfigScreen onBack={() => setScreen("exercise-mode")} onStart={() => setScreen("timer-run")} />
      </ScreenFrame>
    );
  }

  if (screen === "timer-run") {
    return (
      <ScreenFrame>
        <TimerRunScreen onCancel={() => setScreen("coach-home")} onFinish={() => setScreen("exercise-summary")} />
      </ScreenFrame>
    );
  }

  if (screen === "repetition-config") {
    return (
      <ScreenFrame>
        <RepetitionConfigScreen onBack={() => setScreen("exercise-mode")} onStart={() => setScreen("repetition-run")} />
      </ScreenFrame>
    );
  }

  if (screen === "repetition-run") {
    return (
      <ScreenFrame>
        <RepetitionRunScreen onCancel={() => setScreen("coach-home")} onFinish={() => setScreen("exercise-summary")} />
      </ScreenFrame>
    );
  }

  if (screen === "exercise-summary") {
    return (
      <ScreenFrame>
        <ExerciseSummaryScreen
          onDone={() => {
            setSelectedBoxers([]);
            setScreen("coach-home");
          }}
        />
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame>
      {screen === "coach-home" ? <CoachHome onSelect={setScreen} /> : null}
      {screen === "coach-boxers" ? <CoachBoxersScreen onSelect={setScreen} /> : null}
      {screen === "programs" ? <ProgramsScreen onSelect={setScreen} /> : null}
      {screen === "boxer-home" ? <BoxerHome onSelect={setScreen} /> : null}
      {screen === "boxer-history" ? <BoxerHistory onSelect={setScreen} /> : null}
      {screen === "boxer-progress" ? <BoxerProgress onSelect={setScreen} /> : null}
      {screen === "boxer-profile" ? <BoxerProfile onSelect={setScreen} /> : null}
    </ScreenFrame>
  );
}

function HealthProbe() {
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Healthcheck failed");
        }

        return response.json() as Promise<{ status?: string }>;
      })
      .then((body) => setApiStatus(body.status ?? "unknown"))
      .catch(() => setApiStatus("unavailable"));

    return () => controller.abort();
  }, []);

  return <Text style={styles.healthText}>API: {apiStatus}</Text>;
}

export default function App() {
  const [isDummyLoginComplete, setIsDummyLoginComplete] = useState(false);

  if (!isDummyLoginComplete) {
    return <LoginScreen onContinue={() => setIsDummyLoginComplete(true)} />;
  }

  return (
    <AuthSessionProvider>
      <MobileRoleGuard>
        {(role) => (
          <>
            <AppContent role={role} />
            <HealthProbe />
          </>
        )}
      </MobileRoleGuard>
    </AuthSessionProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: "#0b1118",
    flex: 1
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 104
  },
  loginHero: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24
  },
  brand: {
    color: "#f7c948",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 18,
    textTransform: "uppercase"
  },
  loginTitle: {
    color: "#f8fafc",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
    marginBottom: 12
  },
  loginText: {
    color: "#a9b7c6",
    fontSize: 17,
    lineHeight: 24
  },
  formPanel: {
    gap: 12,
    padding: 20,
    paddingBottom: 28
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between"
  },
  headerCopy: {
    flex: 1
  },
  eyebrow: {
    color: "#f7c948",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase"
  },
  title: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 36
  },
  description: {
    color: "#a9b7c6",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8
  },
  section: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800"
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12
  },
  configGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  statCard: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minWidth: 140,
    padding: 16
  },
  statCardWarm: {
    borderColor: "#6b5220"
  },
  statCardGreen: {
    borderColor: "#1e5f48"
  },
  statValue: {
    color: "#f8fafc",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34
  },
  statLabel: {
    color: "#a9b7c6",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 8,
    textTransform: "uppercase"
  },
  listRow: {
    alignItems: "center",
    backgroundColor: "#0d151f",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 14
  },
  selectRow: {
    alignItems: "center",
    backgroundColor: "#0d151f",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 14
  },
  selectRowActive: {
    borderColor: "#f7c948",
    shadowColor: "#f7c948",
    shadowOpacity: 0.18,
    shadowRadius: 12
  },
  rowTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "800"
  },
  rowMeta: {
    color: "#9baabc",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  },
  badge: {
    backgroundColor: "#173526",
    borderRadius: 999,
    color: "#83e6b7",
    fontSize: 12,
    fontWeight: "900",
    minWidth: 46,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center"
  },
  check: {
    borderColor: "#3a4f64",
    borderRadius: 18,
    borderWidth: 1,
    color: "#a9b7c6",
    fontSize: 20,
    fontWeight: "900",
    height: 36,
    lineHeight: 33,
    overflow: "hidden",
    textAlign: "center",
    width: 36
  },
  checkActive: {
    backgroundColor: "#f7c948",
    borderColor: "#f7c948",
    color: "#0b1118"
  },
  input: {
    backgroundColor: "#101a24",
    borderColor: "#304357",
    borderRadius: 8,
    borderWidth: 1,
    color: "#f8fafc",
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f7c948",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: "#3a4f64",
    borderWidth: 1
  },
  dangerButton: {
    backgroundColor: "#3b1d22",
    borderColor: "#7f3842",
    borderWidth: 1
  },
  disabledButton: {
    opacity: 0.45
  },
  pressedButton: {
    opacity: 0.82
  },
  buttonText: {
    color: "#0b1118",
    fontSize: 17,
    fontWeight: "900"
  },
  secondaryButtonText: {
    color: "#d7dee7"
  },
  dangerButtonText: {
    color: "#ffb0b7"
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12
  },
  splitButton: {
    flex: 1
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  tile: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 82,
    padding: 14,
    width: "47%"
  },
  tileText: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "900"
  },
  modeCard: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 18
  },
  modeTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "900"
  },
  modeText: {
    color: "#a9b7c6",
    fontSize: 15,
    lineHeight: 22
  },
  timerPanel: {
    alignItems: "center",
    backgroundColor: "#111b26",
    borderColor: "#f7c948",
    borderRadius: 8,
    borderWidth: 1,
    padding: 28
  },
  timerState: {
    color: "#f7c948",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0
  },
  timer: {
    color: "#f8fafc",
    fontSize: 76,
    fontWeight: "900",
    lineHeight: 86
  },
  timerHint: {
    color: "#a9b7c6",
    fontSize: 16,
    fontWeight: "700"
  },
  bottomNav: {
    backgroundColor: "#0d151f",
    borderColor: "#26394b",
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    gap: 8,
    left: 0,
    padding: 12,
    paddingBottom: 20,
    position: "absolute",
    right: 0
  },
  navItem: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 8
  },
  navItemActive: {
    backgroundColor: "#f7c948"
  },
  navItemText: {
    color: "#a9b7c6",
    fontSize: 12,
    fontWeight: "900"
  },
  navItemTextActive: {
    color: "#0b1118"
  },
  healthText: {
    bottom: 88,
    color: "#6f8193",
    fontSize: 11,
    position: "absolute",
    right: 14
  }
});
