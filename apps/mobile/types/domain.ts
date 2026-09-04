export type UserRole = "coach" | "boxer";

export type BoxerLevel = "beginner" | "intermediate" | "advanced";

export type ProgramStatus = "draft" | "active" | "archived";

export type WorkoutStatus = "planned" | "in_progress" | "completed";

export type ExerciseMode = "timer" | "repetitions";

export type ExerciseType =
  | "bag_work"
  | "sparring"
  | "abs"
  | "jump_rope"
  | "shadow_boxing"
  | "pads"
  | "defensive_technique"
  | "conditioning"
  | "strength"
  | "custom";

export type Boxer = {
  id: string;
  fullName: string;
  level: BoxerLevel;
  avatarInitials: string;
  attendanceThisMonth: number;
  currentWeightKg: number;
  lastWorkoutAt: string;
  activeProgramId: string;
  activeProgramName: string;
  progressTrend: string;
};

export type ProgramBlock = {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  durationMinutes: number;
  coachNotes?: string;
};

export type ProgramSession = {
  id: string;
  title: string;
  description: string;
  order: number;
  blocks: ProgramBlock[];
};

export type TrainingProgram = {
  id: string;
  name: string;
  description: string;
  level: BoxerLevel;
  status: ProgramStatus;
  assignedBoxers: number;
  sessions: ProgramSession[];
};

export type Workout = {
  id: string;
  title: string;
  dateLabel: string;
  status: WorkoutStatus;
  mode: ExerciseMode;
  durationLabel: string;
  participants: string[];
  rounds?: number;
  reps?: number;
};

export type ProgressEntry = {
  id: string;
  dateLabel: string;
  weightKg: number;
  waistCm: number;
  bodyFatPercentage?: number;
  notes: string;
};

export type CoachNote = {
  id: string;
  dateLabel: string;
  text: string;
};

