import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/theme";
import { Button } from "../ui/Button";

type TimerPhase = "preparation" | "round" | "rest" | "completed";

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function WorkoutTimer({
  initialPreparationSeconds = 15,
  roundSeconds = 180,
  restSeconds = 60,
  totalRounds = 4
}: {
  initialPreparationSeconds?: number;
  roundSeconds?: number;
  restSeconds?: number;
  totalRounds?: number;
}) {
  const [phase, setPhase] = useState<TimerPhase>(initialPreparationSeconds > 0 ? "preparation" : "round");
  const [round, setRound] = useState(1);
  const [seconds, setSeconds] = useState(initialPreparationSeconds > 0 ? initialPreparationSeconds : roundSeconds);
  const [isPaused, setIsPaused] = useState(false);

  const phaseLabel = useMemo(() => {
    if (phase === "preparation") {
      return "PREPARACION";
    }

    if (phase === "rest") {
      return "DESCANSO";
    }

    if (phase === "completed") {
      return "FINALIZADO";
    }

    return "ROUND";
  }, [phase]);

  useEffect(() => {
    if (isPaused || phase === "completed") {
      return undefined;
    }

    const interval = setInterval(() => {
      setSeconds((current) => {
        if (current > 0) {
          return current - 1;
        }

        if (phase === "preparation") {
          setPhase("round");
          return roundSeconds;
        }

        if (phase === "round") {
          if (round >= totalRounds) {
            setPhase("completed");
            return 0;
          }

          setPhase("rest");
          return restSeconds;
        }

        setRound((currentRound) => currentRound + 1);
        setPhase("round");
        return roundSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, phase, restSeconds, round, roundSeconds, totalRounds]);

  function restartRound() {
    setPhase("round");
    setSeconds(roundSeconds);
    setIsPaused(false);
  }

  function nextRound() {
    if (round >= totalRounds) {
      setPhase("completed");
      setSeconds(0);
      return;
    }

    setRound((current) => current + 1);
    setPhase("round");
    setSeconds(roundSeconds);
  }

  function restartExercise() {
    setRound(1);
    setPhase(initialPreparationSeconds > 0 ? "preparation" : "round");
    setSeconds(initialPreparationSeconds > 0 ? initialPreparationSeconds : roundSeconds);
    setIsPaused(false);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.panel}>
        <Text style={styles.phase}>{phaseLabel}</Text>
        <Text style={styles.timer}>{formatSeconds(seconds)}</Text>
        <Text style={styles.hint}>Round {round} de {totalRounds}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          label={isPaused ? "Continuar" : "Pausar"}
          onPress={() => setIsPaused((current) => !current)}
          style={styles.action}
        />
        <Button label="Siguiente" onPress={nextRound} variant="secondary" style={styles.action} />
      </View>
      <View style={styles.actions}>
        <Button label="Reiniciar round" onPress={restartRound} variant="secondary" style={styles.action} />
        <Button label="Reiniciar todo" onPress={restartExercise} variant="secondary" style={styles.action} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12
  },
  panel: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.accent,
    borderRadius: 8,
    borderWidth: 1,
    padding: 28
  },
  phase: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0
  },
  timer: {
    color: colors.text,
    fontSize: 76,
    fontWeight: "900",
    lineHeight: 86
  },
  hint: {
    color: colors.subtext,
    fontSize: 16,
    fontWeight: "800"
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  action: {
    flex: 1
  }
});

