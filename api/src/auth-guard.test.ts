import test from "node:test";
import assert from "node:assert/strict";

import type { AuthUser } from "@boxpulse/shared/types";

import { requireApiAuthUser } from "./auth-guard.js";

const activeCoach: AuthUser = {
  email: "coach@gym.com",
  gym_id: "00000000-0000-4000-8000-000000000011",
  id: "00000000-0000-4000-8000-000000000010",
  is_active: true,
  role: "coach"
};

test("requireApiAuthUser allows active users with an allowed role", () => {
  assert.deepEqual(requireApiAuthUser(activeCoach, ["coach"]), {
    ok: true,
    user: activeCoach
  });
});

test("requireApiAuthUser returns unauthorized when no user is present", () => {
  assert.deepEqual(requireApiAuthUser(null, ["coach"]), {
    ok: false,
    response: {
      body: {
        error: {
          code: "unauthenticated",
          details: {},
          message: "Authentication is required"
        }
      },
      statusCode: 401
    }
  });
});

test("requireApiAuthUser returns forbidden for inactive users and unsupported roles", () => {
  assert.deepEqual(requireApiAuthUser({ ...activeCoach, is_active: false }, ["coach"]), {
    ok: false,
    response: {
      body: {
        error: {
          code: "inactive_user",
          details: {},
          message: "Inactive users cannot access BoxPulse"
        }
      },
      statusCode: 403
    }
  });

  assert.deepEqual(requireApiAuthUser(activeCoach, ["admin"]), {
    ok: false,
    response: {
      body: {
        error: {
          code: "forbidden_role",
          details: {},
          message: "User role is not allowed to access this resource"
        }
      },
      statusCode: 403
    }
  });
});
