import test from "node:test";
import assert from "node:assert/strict";

import {
  exerciseRepetitionConfigSchema,
  exerciseSchema,
  exerciseTimerConfigSchema,
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
