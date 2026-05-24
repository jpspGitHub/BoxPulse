import test from "node:test";
import assert from "node:assert/strict";

import {
  authorizeAuthUser,
  canAccessWithRole,
  hasAllowedRole,
  isActiveAuthUser,
  requireActiveAuthUser
} from "../auth/index.js";
import {
  adminCreateUserRequestSchema,
  adminManagedUserRoleSchema,
  adminUpdateUserRequestSchema,
  adminUserSchema,
  adminUsersListResponseSchema,
  authSessionSchema,
  currentAuthUserSchema,
  exerciseRepetitionConfigSchema,
  exerciseSchema,
  exerciseTimerConfigSchema,
  loginRequestSchema,
  progressEntrySchema,
  userRoleSchema
} from "./index.js";

const entityFields = {
  id: "00000000-0000-4000-8000-000000000001",
  created_at: "2026-05-21T12:00:00.000Z",
  updated_at: "2026-05-21T12:00:00.000Z"
};

test("userRoleSchema accepts the supported MVP roles", () => {
  assert.equal(userRoleSchema.parse("admin"), "admin");
  assert.equal(userRoleSchema.parse("coach"), "coach");
  assert.equal(userRoleSchema.parse("boxer"), "boxer");
});

test("adminManagedUserRoleSchema accepts only coach and boxer roles", () => {
  assert.equal(adminManagedUserRoleSchema.parse("coach"), "coach");
  assert.equal(adminManagedUserRoleSchema.parse("boxer"), "boxer");
  assert.equal(adminManagedUserRoleSchema.safeParse("admin").success, false);
});

test("loginRequestSchema validates the auth login contract", () => {
  assert.equal(
    loginRequestSchema.safeParse({
      email: "coach@gym.com",
      password: "secret"
    }).success,
    true
  );

  assert.equal(
    loginRequestSchema.safeParse({
      email: "not-an-email",
      password: ""
    }).success,
    false
  );
});

test("authSessionSchema validates access token and active auth user shape", () => {
  const result = authSessionSchema.safeParse({
    access_token: "jwt",
    user: {
      id: "00000000-0000-4000-8000-000000000010",
      email: "coach@gym.com",
      role: "coach",
      gym_id: "00000000-0000-4000-8000-000000000011",
      is_active: true
    }
  });

  assert.equal(result.success, true);
});

test("currentAuthUserSchema validates the auth me contract", () => {
  const result = currentAuthUserSchema.safeParse({
    id: "00000000-0000-4000-8000-000000000010",
    email: "coach@gym.com",
    role: "coach",
    gym_id: "00000000-0000-4000-8000-000000000011",
    profile: {
      id: "00000000-0000-4000-8000-000000000012",
      first_name: "Nicolas",
      last_name: "Cabrera",
      avatar_url: null
    }
  });

  assert.equal(result.success, true);
});

test("adminUserSchema validates admin-managed user summaries", () => {
  const result = adminUserSchema.safeParse({
    id: "00000000-0000-4000-8000-000000000020",
    email: "boxer@gym.com",
    role: "boxer",
    is_active: true,
    profile: {
      id: "00000000-0000-4000-8000-000000000021",
      first_name: "Martin",
      last_name: "Rodriguez",
      phone: "+59899999999",
      level: "intermediate"
    }
  });

  assert.equal(result.success, true);
});

test("adminUsersListResponseSchema validates list data and pagination", () => {
  const result = adminUsersListResponseSchema.safeParse({
    data: [
      {
        id: "00000000-0000-4000-8000-000000000020",
        email: "coach@gym.com",
        role: "coach",
        is_active: true,
        profile: {
          id: "00000000-0000-4000-8000-000000000021",
          first_name: "Nicolas",
          last_name: "Cabrera",
          phone: null,
          level: null
        }
      }
    ],
    pagination: {
      page: 1,
      page_size: 20,
      total: 1
    }
  });

  assert.equal(result.success, true);
});

test("adminCreateUserRequestSchema validates coach and boxer creation contracts", () => {
  assert.equal(
    adminCreateUserRequestSchema.safeParse({
      email: "coach@gym.com",
      role: "coach",
      first_name: "Nicolas",
      last_name: "Cabrera",
      phone: "+59899999999"
    }).success,
    true
  );

  assert.equal(
    adminCreateUserRequestSchema.safeParse({
      email: "boxer@gym.com",
      role: "boxer",
      first_name: "Martin",
      last_name: "Rodriguez",
      phone: null,
      level: "intermediate"
    }).success,
    true
  );
});

test("adminCreateUserRequestSchema rejects admin role and invalid boxer level", () => {
  assert.equal(
    adminCreateUserRequestSchema.safeParse({
      email: "admin@gym.com",
      role: "admin",
      first_name: "Admin",
      last_name: "User"
    }).success,
    false
  );

  assert.equal(
    adminCreateUserRequestSchema.safeParse({
      email: "boxer@gym.com",
      role: "boxer",
      first_name: "Martin",
      last_name: "Rodriguez",
      level: "elite"
    }).success,
    false
  );

  assert.equal(
    adminCreateUserRequestSchema.safeParse({
      email: "coach@gym.com",
      role: "coach",
      first_name: "Nicolas",
      last_name: "Cabrera",
      level: "beginner"
    }).success,
    false
  );
});

test("adminUpdateUserRequestSchema validates partial profile updates", () => {
  assert.equal(
    adminUpdateUserRequestSchema.safeParse({
      first_name: "Martin"
    }).success,
    true
  );

  assert.equal(
    adminUpdateUserRequestSchema.safeParse({
      phone: null,
      level: "advanced"
    }).success,
    true
  );

  assert.equal(adminUpdateUserRequestSchema.safeParse({}).success, false);
  assert.equal(
    adminUpdateUserRequestSchema.safeParse({
      level: "elite"
    }).success,
    false
  );
});

test("auth helpers validate roles and inactive users", () => {
  const coach = {
    id: "00000000-0000-4000-8000-000000000010",
    email: "coach@gym.com",
    role: "coach" as const,
    gym_id: "00000000-0000-4000-8000-000000000011",
    is_active: true
  };

  assert.equal(isActiveAuthUser(coach), true);
  assert.equal(hasAllowedRole(coach, ["admin"]), false);
  assert.equal(hasAllowedRole(coach, ["admin", "coach"]), true);
  assert.equal(canAccessWithRole(coach, ["coach"]), true);
  assert.equal(canAccessWithRole({ ...coach, is_active: false }, ["coach"]), false);
});

test("auth authorization helpers return explicit access decisions", () => {
  const boxer = {
    id: "00000000-0000-4000-8000-000000000010",
    email: "boxer@gym.com",
    role: "boxer" as const,
    gym_id: "00000000-0000-4000-8000-000000000011",
    is_active: true
  };

  assert.deepEqual(requireActiveAuthUser(null), {
    error: {
      code: "unauthenticated",
      message: "Authentication is required"
    },
    ok: false
  });

  assert.deepEqual(requireActiveAuthUser({ ...boxer, is_active: false }), {
    error: {
      code: "inactive_user",
      message: "Inactive users cannot access BoxPulse"
    },
    ok: false
  });

  assert.deepEqual(authorizeAuthUser(boxer, ["admin"]), {
    error: {
      code: "forbidden_role",
      message: "User role is not allowed to access this resource"
    },
    ok: false
  });

  assert.deepEqual(authorizeAuthUser(boxer, ["boxer"]), {
    ok: true,
    user: boxer
  });
});

test("exerciseSchema rejects unsupported exercise modes", () => {
  const result = exerciseSchema.safeParse({
    ...entityFields,
    gym_id: "00000000-0000-4000-8000-000000000002",
    coach_id: "00000000-0000-4000-8000-000000000003",
    type: "bag_work",
    mode: "interval",
    status: "pending"
  });

  assert.equal(result.success, false);
});

test("exerciseTimerConfigSchema validates positive rounds and non-negative rest", () => {
  const valid = exerciseTimerConfigSchema.safeParse({
    ...entityFields,
    exercise_id: "00000000-0000-4000-8000-000000000004",
    rounds: 3,
    round_duration_seconds: 180,
    rest_duration_seconds: 60,
    preparation_seconds: 10
  });

  assert.equal(valid.success, true);

  const invalid = exerciseTimerConfigSchema.safeParse({
    ...entityFields,
    exercise_id: "00000000-0000-4000-8000-000000000004",
    rounds: 0,
    round_duration_seconds: 180,
    rest_duration_seconds: -1
  });

  assert.equal(invalid.success, false);
});

test("exerciseRepetitionConfigSchema requires positive repetitions", () => {
  const result = exerciseRepetitionConfigSchema.safeParse({
    ...entityFields,
    exercise_id: "00000000-0000-4000-8000-000000000004",
    repetitions: 0,
    sets: 3
  });

  assert.equal(result.success, false);
});

test("progressEntrySchema bounds body fat percentage", () => {
  const result = progressEntrySchema.safeParse({
    id: "00000000-0000-4000-8000-000000000005",
    boxer_id: "00000000-0000-4000-8000-000000000006",
    body_fat_percentage: 101,
    entry_date: "2026-05-21",
    created_at: "2026-05-21T12:00:00.000Z"
  });

  assert.equal(result.success, false);
});
