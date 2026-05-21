export const BOXPULSE_APP_NAME = "BoxPulse";

export const USER_ROLES = ["admin", "coach", "boxer"] as const;

export const BOXER_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const TRAINING_PROGRAM_STATUSES = ["draft", "active", "archived"] as const;

export const TRAINING_PROGRAM_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const PROGRAM_ASSIGNMENT_STATUSES = ["active", "completed", "canceled"] as const;

export const TRAINING_BLOCK_TYPES = [
  "warmup",
  "shadow_boxing",
  "jump_rope",
  "bag_work",
  "pads",
  "sparring",
  "strength",
  "conditioning",
  "core",
  "cooldown",
  "custom"
] as const;

export const EXERCISE_TYPES = [
  "bag_work",
  "sparring",
  "abs",
  "jump_rope",
  "shadow_boxing",
  "pads",
  "defensive_technique",
  "conditioning",
  "strength",
  "custom"
] as const;

export const EXERCISE_MODES = ["timer", "repetitions"] as const;

export const EXERCISE_STATUSES = ["pending", "in_progress", "completed", "canceled"] as const;

export const EXERCISE_PARTICIPANT_STATUSES = [
  "selected",
  "present",
  "completed",
  "removed"
] as const;

export const ATTENDANCE_SOURCES = ["manual", "exercise_participation"] as const;
