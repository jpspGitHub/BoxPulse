import type {
  ADMIN_MANAGED_USER_ROLES,
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

type ArrayValue<T extends readonly string[]> = T[number];

export type UserRole = ArrayValue<typeof USER_ROLES>;
export type AdminManagedUserRole = ArrayValue<typeof ADMIN_MANAGED_USER_ROLES>;
export type BoxerLevel = ArrayValue<typeof BOXER_LEVELS>;
export type TrainingProgramStatus = ArrayValue<typeof TRAINING_PROGRAM_STATUSES>;
export type TrainingProgramLevel = ArrayValue<typeof TRAINING_PROGRAM_LEVELS>;
export type ProgramAssignmentStatus = ArrayValue<typeof PROGRAM_ASSIGNMENT_STATUSES>;
export type TrainingBlockType = ArrayValue<typeof TRAINING_BLOCK_TYPES>;
export type ExerciseType = ArrayValue<typeof EXERCISE_TYPES>;
export type ExerciseMode = ArrayValue<typeof EXERCISE_MODES>;
export type ExerciseStatus = ArrayValue<typeof EXERCISE_STATUSES>;
export type ExerciseParticipantStatus = ArrayValue<typeof EXERCISE_PARTICIPANT_STATUSES>;
export type AttendanceSource = ArrayValue<typeof ATTENDANCE_SOURCES>;

export type Uuid = string;
export type IsoDate = string;
export type IsoDateTime = string;

export interface BaseEntity {
  id: Uuid;
  created_at: IsoDateTime;
  updated_at: IsoDateTime;
}

export interface User extends BaseEntity {
  email: string;
  is_active: boolean;
}

export interface AuthUser {
  id: Uuid;
  email: string;
  role: UserRole;
  gym_id: Uuid;
  is_active: boolean;
}

export interface AuthProfileSummary {
  id: Uuid;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
}

export interface AuthSession {
  access_token: string;
  user: AuthUser;
}

export interface CurrentAuthUser {
  id: Uuid;
  email: string;
  role: UserRole;
  gym_id: Uuid;
  profile: AuthProfileSummary;
}

export interface AdminUserProfileSummary {
  id: Uuid;
  first_name: string;
  last_name: string;
  phone?: string | null;
  level?: BoxerLevel | null;
}

export interface AdminUser {
  id: Uuid;
  email: string;
  role: AdminManagedUserRole;
  is_active: boolean;
  profile: AdminUserProfileSummary;
}

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
}

export interface AdminUsersListResponse {
  data: AdminUser[];
  pagination: Pagination;
}

export interface AdminCreateCoachUserRequest {
  email: string;
  role: "coach";
  first_name: string;
  last_name: string;
  phone?: string | null;
}

export interface AdminCreateBoxerUserRequest {
  email: string;
  role: "boxer";
  first_name: string;
  last_name: string;
  phone?: string | null;
  level?: BoxerLevel | null;
}

export type AdminCreateUserRequest = AdminCreateCoachUserRequest | AdminCreateBoxerUserRequest;

export interface AdminUpdateUserRequest {
  first_name?: string;
  last_name?: string;
  phone?: string | null;
  level?: BoxerLevel | null;
}

export interface Gym extends BaseEntity {
  name: string;
  slug: string;
}

export interface GymMember extends BaseEntity {
  gym_id: Uuid;
  user_id: Uuid;
  role: UserRole;
}

export interface CoachProfile extends BaseEntity {
  user_id: Uuid;
  gym_id: Uuid;
  first_name: string;
  last_name: string;
  phone?: string | null;
  avatar_url?: string | null;
  notes?: string | null;
}

export interface BoxerProfile extends BaseEntity {
  user_id: Uuid;
  gym_id: Uuid;
  first_name: string;
  last_name: string;
  phone?: string | null;
  avatar_url?: string | null;
  birth_date?: IsoDate | null;
  height?: number | null;
  initial_weight?: number | null;
  level?: BoxerLevel | null;
  notes?: string | null;
}

export interface TrainingProgram extends BaseEntity {
  gym_id: Uuid;
  coach_id: Uuid;
  name: string;
  description?: string | null;
  level: TrainingProgramLevel;
  status: TrainingProgramStatus;
}

export interface TrainingSession extends BaseEntity {
  program_id: Uuid;
  name: string;
  description?: string | null;
  order_index: number;
}

export interface TrainingBlock extends BaseEntity {
  session_id: Uuid;
  type: TrainingBlockType;
  name: string;
  description?: string | null;
  duration_seconds?: number | null;
  order_index: number;
  coach_notes?: string | null;
}

export interface TimerConfig extends BaseEntity {
  session_id: Uuid;
  rounds: number;
  round_duration_seconds: number;
  rest_duration_seconds: number;
  preparation_seconds?: number | null;
}

export interface ProgramAssignment extends BaseEntity {
  program_id: Uuid;
  boxer_id: Uuid;
  coach_id: Uuid;
  start_date: IsoDate;
  status: ProgramAssignmentStatus;
}

export interface Exercise extends BaseEntity {
  gym_id: Uuid;
  coach_id: Uuid;
  type: ExerciseType;
  mode: ExerciseMode;
  status: ExerciseStatus;
  started_at?: IsoDateTime | null;
  finished_at?: IsoDateTime | null;
  canceled_at?: IsoDateTime | null;
  notes?: string | null;
}

export interface ExerciseTimerConfig extends BaseEntity {
  exercise_id: Uuid;
  rounds: number;
  round_duration_seconds: number;
  rest_duration_seconds: number;
  preparation_seconds?: number | null;
}

export interface ExerciseRepetitionConfig extends BaseEntity {
  exercise_id: Uuid;
  repetitions: number;
  sets?: number | null;
}

export interface ExerciseParticipant extends BaseEntity {
  exercise_id: Uuid;
  boxer_id: Uuid;
  status: ExerciseParticipantStatus;
}

export interface WorkoutCompletion {
  id: Uuid;
  assignment_id?: Uuid | null;
  session_id?: Uuid | null;
  boxer_id: Uuid;
  exercise_id?: Uuid | null;
  completed_at: IsoDateTime;
  notes?: string | null;
  created_at: IsoDateTime;
}

export interface ProgressEntry {
  id: Uuid;
  boxer_id: Uuid;
  weight?: number | null;
  height?: number | null;
  waist?: number | null;
  chest?: number | null;
  arm?: number | null;
  leg?: number | null;
  body_fat_percentage?: number | null;
  notes?: string | null;
  entry_date: IsoDate;
  created_at: IsoDateTime;
}

export interface AttendanceRecord {
  id: Uuid;
  gym_id: Uuid;
  boxer_id: Uuid;
  coach_id?: Uuid | null;
  source: AttendanceSource;
  attended_at: IsoDateTime;
  created_at: IsoDateTime;
}
