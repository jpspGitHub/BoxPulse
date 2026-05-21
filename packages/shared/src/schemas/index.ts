import { z } from "zod";

import {
  ATTENDANCE_SOURCES,
  BOXER_LEVELS,
  EXERCISE_MODES,
  EXERCISE_PARTICIPANT_STATUSES,
  EXERCISE_STATUSES,
  EXERCISE_TYPES,
  PROGRAM_ASSIGNMENT_STATUSES,
  TRAINING_BLOCK_TYPES,
  TRAINING_PROGRAM_LEVELS,
  TRAINING_PROGRAM_STATUSES,
  USER_ROLES
} from "../constants/index.js";

const optionalNullableStringSchema = z.string().trim().min(1).optional().nullable();
const positiveNumberSchema = z.number().positive();
const positiveIntegerSchema = z.number().int().positive();
const nonNegativeIntegerSchema = z.number().int().min(0);

export const uuidSchema = z.string().uuid();
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const isoDateTimeSchema = z.string().datetime({ offset: true });

export const userRoleSchema = z.enum(USER_ROLES);
export const boxerLevelSchema = z.enum(BOXER_LEVELS);
export const trainingProgramStatusSchema = z.enum(TRAINING_PROGRAM_STATUSES);
export const trainingProgramLevelSchema = z.enum(TRAINING_PROGRAM_LEVELS);
export const programAssignmentStatusSchema = z.enum(PROGRAM_ASSIGNMENT_STATUSES);
export const trainingBlockTypeSchema = z.enum(TRAINING_BLOCK_TYPES);
export const exerciseTypeSchema = z.enum(EXERCISE_TYPES);
export const exerciseModeSchema = z.enum(EXERCISE_MODES);
export const exerciseStatusSchema = z.enum(EXERCISE_STATUSES);
export const exerciseParticipantStatusSchema = z.enum(EXERCISE_PARTICIPANT_STATUSES);
export const attendanceSourceSchema = z.enum(ATTENDANCE_SOURCES);

export const baseEntitySchema = z.object({
  id: uuidSchema,
  created_at: isoDateTimeSchema,
  updated_at: isoDateTimeSchema
});

export const userSchema = baseEntitySchema.extend({
  email: z.string().email(),
  is_active: z.boolean()
});

export const gymSchema = baseEntitySchema.extend({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1)
});

export const gymMemberSchema = baseEntitySchema.extend({
  gym_id: uuidSchema,
  user_id: uuidSchema,
  role: userRoleSchema
});

export const coachProfileSchema = baseEntitySchema.extend({
  user_id: uuidSchema,
  gym_id: uuidSchema,
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  phone: optionalNullableStringSchema,
  avatar_url: z.string().url().optional().nullable(),
  notes: optionalNullableStringSchema
});

export const boxerProfileSchema = coachProfileSchema.extend({
  birth_date: isoDateSchema.optional().nullable(),
  height: positiveNumberSchema.optional().nullable(),
  initial_weight: positiveNumberSchema.optional().nullable(),
  level: boxerLevelSchema.optional().nullable()
});

export const trainingProgramSchema = baseEntitySchema.extend({
  gym_id: uuidSchema,
  coach_id: uuidSchema,
  name: z.string().trim().min(1),
  description: optionalNullableStringSchema,
  level: trainingProgramLevelSchema,
  status: trainingProgramStatusSchema
});

export const trainingSessionSchema = baseEntitySchema.extend({
  program_id: uuidSchema,
  name: z.string().trim().min(1),
  description: optionalNullableStringSchema,
  order_index: nonNegativeIntegerSchema
});

export const trainingBlockSchema = baseEntitySchema.extend({
  session_id: uuidSchema,
  type: trainingBlockTypeSchema,
  name: z.string().trim().min(1),
  description: optionalNullableStringSchema,
  duration_seconds: positiveIntegerSchema.optional().nullable(),
  order_index: nonNegativeIntegerSchema,
  coach_notes: optionalNullableStringSchema
});

export const timerConfigSchema = baseEntitySchema.extend({
  session_id: uuidSchema,
  rounds: positiveIntegerSchema,
  round_duration_seconds: positiveIntegerSchema,
  rest_duration_seconds: nonNegativeIntegerSchema,
  preparation_seconds: nonNegativeIntegerSchema.optional().nullable()
});

export const programAssignmentSchema = baseEntitySchema.extend({
  program_id: uuidSchema,
  boxer_id: uuidSchema,
  coach_id: uuidSchema,
  start_date: isoDateSchema,
  status: programAssignmentStatusSchema
});

export const exerciseSchema = baseEntitySchema.extend({
  gym_id: uuidSchema,
  coach_id: uuidSchema,
  type: exerciseTypeSchema,
  mode: exerciseModeSchema,
  status: exerciseStatusSchema,
  started_at: isoDateTimeSchema.optional().nullable(),
  finished_at: isoDateTimeSchema.optional().nullable(),
  canceled_at: isoDateTimeSchema.optional().nullable(),
  notes: optionalNullableStringSchema
});

export const exerciseTimerConfigSchema = baseEntitySchema.extend({
  exercise_id: uuidSchema,
  rounds: positiveIntegerSchema,
  round_duration_seconds: positiveIntegerSchema,
  rest_duration_seconds: nonNegativeIntegerSchema,
  preparation_seconds: nonNegativeIntegerSchema.optional().nullable()
});

export const exerciseRepetitionConfigSchema = baseEntitySchema.extend({
  exercise_id: uuidSchema,
  repetitions: positiveIntegerSchema,
  sets: positiveIntegerSchema.optional().nullable()
});

export const exerciseParticipantSchema = baseEntitySchema.extend({
  exercise_id: uuidSchema,
  boxer_id: uuidSchema,
  status: exerciseParticipantStatusSchema
});

export const workoutCompletionSchema = z.object({
  id: uuidSchema,
  assignment_id: uuidSchema.optional().nullable(),
  session_id: uuidSchema.optional().nullable(),
  boxer_id: uuidSchema,
  exercise_id: uuidSchema.optional().nullable(),
  completed_at: isoDateTimeSchema,
  notes: optionalNullableStringSchema,
  created_at: isoDateTimeSchema
});

export const progressEntrySchema = z.object({
  id: uuidSchema,
  boxer_id: uuidSchema,
  weight: positiveNumberSchema.optional().nullable(),
  height: positiveNumberSchema.optional().nullable(),
  waist: positiveNumberSchema.optional().nullable(),
  chest: positiveNumberSchema.optional().nullable(),
  arm: positiveNumberSchema.optional().nullable(),
  leg: positiveNumberSchema.optional().nullable(),
  body_fat_percentage: z.number().min(0).max(100).optional().nullable(),
  notes: optionalNullableStringSchema,
  entry_date: isoDateSchema,
  created_at: isoDateTimeSchema
});

export const attendanceRecordSchema = z.object({
  id: uuidSchema,
  gym_id: uuidSchema,
  boxer_id: uuidSchema,
  coach_id: uuidSchema.optional().nullable(),
  source: attendanceSourceSchema,
  attended_at: isoDateTimeSchema,
  created_at: isoDateTimeSchema
});

export type UserRoleInput = z.infer<typeof userRoleSchema>;
export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type ExerciseTimerConfigInput = z.infer<typeof exerciseTimerConfigSchema>;
export type ExerciseRepetitionConfigInput = z.infer<typeof exerciseRepetitionConfigSchema>;
export type ProgressEntryInput = z.infer<typeof progressEntrySchema>;
