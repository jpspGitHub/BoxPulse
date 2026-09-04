import type { Boxer, CoachNote, ExerciseType, ProgressEntry, TrainingProgram, Workout } from "../types/domain";

export const exerciseLabels: Record<ExerciseType, string> = {
  abs: "Abdominales",
  bag_work: "Bolsa",
  conditioning: "Resistencia",
  custom: "Personalizado",
  defensive_technique: "Tecnica defensiva",
  jump_rope: "Comba",
  pads: "Manoplas",
  shadow_boxing: "Sombra",
  sparring: "Sparring",
  strength: "Fuerza"
};

export const exerciseTypes = Object.entries(exerciseLabels).map(([id, label]) => ({
  id: id as ExerciseType,
  label
}));

export const boxers: Boxer[] = [
  {
    id: "martin",
    fullName: "Martin Rodriguez",
    level: "intermediate",
    avatarInitials: "MR",
    attendanceThisMonth: 12,
    currentWeightKg: 76.2,
    lastWorkoutAt: "Hoy",
    activeProgramId: "base-tecnica",
    activeProgramName: "Base tecnica 4 semanas",
    progressTrend: "-1.4 kg"
  },
  {
    id: "sofia",
    fullName: "Sofia Pereira",
    level: "advanced",
    avatarInitials: "SP",
    attendanceThisMonth: 15,
    currentWeightKg: 61.8,
    lastWorkoutAt: "Ayer",
    activeProgramId: "competitivo",
    activeProgramName: "Condicionamiento competitivo",
    progressTrend: "+8% carga"
  },
  {
    id: "lucas",
    fullName: "Lucas Cabrera",
    level: "beginner",
    avatarInitials: "LC",
    attendanceThisMonth: 7,
    currentWeightKg: 82.4,
    lastWorkoutAt: "Lun",
    activeProgramId: "base-tecnica",
    activeProgramName: "Base tecnica 4 semanas",
    progressTrend: "+3 asist."
  },
  {
    id: "valentina",
    fullName: "Valentina Silva",
    level: "intermediate",
    avatarInitials: "VS",
    attendanceThisMonth: 10,
    currentWeightKg: 67.5,
    lastWorkoutAt: "Hoy",
    activeProgramId: "fuerza-core",
    activeProgramName: "Fuerza y core",
    progressTrend: "-2 cm cintura"
  }
];

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "base-tecnica",
    name: "Base tecnica 4 semanas",
    description: "Construccion de fundamentos, guardia, desplazamientos y volumen controlado.",
    level: "beginner",
    status: "active",
    assignedBoxers: 8,
    sessions: [
      {
        id: "base-s1",
        title: "Guardia y desplazamiento",
        description: "Entrada tecnica con sombra, bolsa y core.",
        order: 1,
        blocks: [
          {
            id: "base-s1-b1",
            type: "shadow_boxing",
            title: "Sombra guiada",
            description: "Tres rounds livianos priorizando guardia.",
            durationMinutes: 12,
            coachNotes: "Corregir mano de atras baja."
          },
          {
            id: "base-s1-b2",
            type: "bag_work",
            title: "Bolsa tecnica",
            description: "Jab, cross y salida lateral.",
            durationMinutes: 18
          }
        ]
      },
      {
        id: "base-s2",
        title: "Defensa inicial",
        description: "Bloqueos simples y contraataque.",
        order: 2,
        blocks: [
          {
            id: "base-s2-b1",
            type: "defensive_technique",
            title: "Bloqueo y respuesta",
            description: "Trabajo por parejas sin contacto fuerte.",
            durationMinutes: 20
          }
        ]
      }
    ]
  },
  {
    id: "competitivo",
    name: "Condicionamiento competitivo",
    description: "Rounds intensos, descanso medido y foco en resistencia especifica.",
    level: "advanced",
    status: "active",
    assignedBoxers: 5,
    sessions: [
      {
        id: "comp-s1",
        title: "Volumen de bolsa",
        description: "Trabajo por rounds con ritmo alto.",
        order: 1,
        blocks: [
          {
            id: "comp-s1-b1",
            type: "bag_work",
            title: "Bolsa por rounds",
            description: "Cuatro rounds de tres minutos.",
            durationMinutes: 16
          }
        ]
      }
    ]
  },
  {
    id: "fuerza-core",
    name: "Fuerza y core",
    description: "Circuito simple para base fisica y estabilidad.",
    level: "intermediate",
    status: "draft",
    assignedBoxers: 3,
    sessions: [
      {
        id: "core-s1",
        title: "Core y tren superior",
        description: "Trabajo por repeticiones y control tecnico.",
        order: 1,
        blocks: [
          {
            id: "core-s1-b1",
            type: "strength",
            title: "Circuito de fuerza",
            description: "Flexiones, plancha y sentadillas.",
            durationMinutes: 24
          }
        ]
      }
    ]
  }
];

export const workouts: Workout[] = [
  {
    id: "workout-bag-rounds",
    title: "Bolsa por rounds",
    dateLabel: "Hoy",
    status: "completed",
    mode: "timer",
    durationLabel: "24 min",
    participants: ["Martin Rodriguez", "Sofia Pereira", "Valentina Silva"],
    rounds: 4
  },
  {
    id: "workout-jump-rope",
    title: "Comba por repeticiones",
    dateLabel: "Ayer",
    status: "completed",
    mode: "repetitions",
    durationLabel: "14 min",
    participants: ["Sofia Pereira"],
    reps: 200
  },
  {
    id: "workout-defense",
    title: "Tecnica defensiva",
    dateLabel: "Lun",
    status: "completed",
    mode: "timer",
    durationLabel: "32 min",
    participants: ["Martin Rodriguez", "Lucas Cabrera"],
    rounds: 6
  }
];

export const progressEntries: ProgressEntry[] = [
  {
    id: "p1",
    dateLabel: "28 May",
    weightKg: 76.2,
    waistCm: 82,
    bodyFatPercentage: 16,
    notes: "Se siente mas liviano en los rounds largos."
  },
  {
    id: "p2",
    dateLabel: "14 May",
    weightKg: 77.1,
    waistCm: 84,
    bodyFatPercentage: 17,
    notes: "Buena asistencia, mejorar descanso."
  },
  {
    id: "p3",
    dateLabel: "1 May",
    weightKg: 77.6,
    waistCm: 85,
    notes: "Inicio de bloque tecnico."
  }
];

export const coachNotes: CoachNote[] = [
  {
    id: "n1",
    dateLabel: "Hoy",
    text: "Mantener guardia al salir de la combinacion."
  },
  {
    id: "n2",
    dateLabel: "Semana pasada",
    text: "Buen ritmo en bolsa, subir exigencia progresivamente."
  }
];

export function findBoxer(id: string): Boxer {
  const boxer = boxers.find((item) => item.id === id) ?? boxers[0];

  if (!boxer) {
    throw new Error("Missing boxer mock data");
  }

  return boxer;
}

export function findProgram(id: string): TrainingProgram {
  const program = trainingPrograms.find((item) => item.id === id) ?? trainingPrograms[0];

  if (!program) {
    throw new Error("Missing training program mock data");
  }

  return program;
}

export function findWorkout(id: string): Workout {
  const workout = workouts.find((item) => item.id === id) ?? workouts[0];

  if (!workout) {
    throw new Error("Missing workout mock data");
  }

  return workout;
}
