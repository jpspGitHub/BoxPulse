import { useMemo, useState } from "react";

import type { MobileAppRole } from "../lib/mobile-role-guard";
import { ScreenFrame } from "./components/ui";
import {
  BoxerHistory,
  BoxerHome,
  BoxerProfile,
  BoxerProgress
} from "./screens/boxer-screens";
import { CoachBoxersScreen, CoachHome, ProgramsScreen } from "./screens/coach-screens";
import {
  ExerciseModeScreen,
  ExerciseSummaryScreen,
  ExerciseTypeScreen,
  ParticipantsScreen,
  RepetitionConfigScreen,
  RepetitionRunScreen,
  TimerConfigScreen,
  TimerRunScreen
} from "./screens/exercise-screens";
import type { AppScreen } from "./types/navigation";

export function AppContent({ role }: { role: MobileAppRole }) {
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
