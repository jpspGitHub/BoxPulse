import test from "node:test";
import assert from "node:assert/strict";

import type { AdminUser, AuthUser } from "@boxpulse/shared/types";

import {
  type AdminUsersRepository,
  getAdminUserForApi,
  listAdminUsersForApi
} from "./admin-users.js";

const adminUser: AuthUser = {
  email: "admin@gym.com",
  gym_id: "00000000-0000-4000-8000-000000000011",
  id: "00000000-0000-4000-8000-000000000010",
  is_active: true,
  role: "admin"
};

const coachUser: AuthUser = {
  ...adminUser,
  email: "coach@gym.com",
  id: "00000000-0000-4000-8000-000000000012",
  role: "coach"
};

const managedCoach: AdminUser = {
  email: "coach@gym.com",
  id: "00000000-0000-4000-8000-000000000012",
  is_active: true,
  profile: {
    first_name: "Nicolas",
    id: "00000000-0000-4000-8000-000000000013",
    last_name: "Cabrera",
    level: null,
    phone: null
  },
  role: "coach"
};

const managedBoxer: AdminUser = {
  email: "boxer@gym.com",
  id: "00000000-0000-4000-8000-000000000014",
  is_active: false,
  profile: {
    first_name: "Martin",
    id: "00000000-0000-4000-8000-000000000015",
    last_name: "Rodriguez",
    level: "intermediate",
    phone: "+59899999999"
  },
  role: "boxer"
};

function createRepository(): AdminUsersRepository & {
  lastGymId?: string;
  lastPage?: number;
  lastPageSize?: number;
  lastUserId?: string;
} {
  return {
    async getAdminUserById(gymId, userId) {
      this.lastGymId = gymId;
      this.lastUserId = userId;

      return userId === managedBoxer.id ? managedBoxer : null;
    },
    async listAdminUsers(gymId, page, pageSize) {
      this.lastGymId = gymId;
      this.lastPage = page;
      this.lastPageSize = pageSize;

      return {
        data: [managedCoach, managedBoxer],
        total: 2
      };
    }
  };
}

test("listAdminUsersForApi returns paginated users for active admins", async () => {
  const repository = createRepository();
  const result = await listAdminUsersForApi(adminUser, repository, {
    page: "2",
    page_size: "10"
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, {
    data: [managedCoach, managedBoxer],
    pagination: {
      page: 2,
      page_size: 10,
      total: 2
    }
  });
  assert.equal(repository.lastGymId, adminUser.gym_id);
  assert.equal(repository.lastPage, 2);
  assert.equal(repository.lastPageSize, 10);
});

test("listAdminUsersForApi denies non-admin users", async () => {
  const result = await listAdminUsersForApi(coachUser, createRepository(), {});

  assert.equal(result.statusCode, 403);
  assert.deepEqual(result.body, {
    error: {
      code: "forbidden_role",
      details: {},
      message: "User role is not allowed to access this resource"
    }
  });
});

test("listAdminUsersForApi validates pagination query params", async () => {
  const result = await listAdminUsersForApi(adminUser, createRepository(), {
    page: "0"
  });

  assert.equal(result.statusCode, 400);
  assert.deepEqual(result.body, {
    error: {
      code: "bad_request",
      details: {},
      message: "Pagination parameters are invalid"
    }
  });
});

test("getAdminUserForApi returns details scoped to the admin gym", async () => {
  const repository = createRepository();
  const result = await getAdminUserForApi(adminUser, repository, managedBoxer.id);

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, managedBoxer);
  assert.equal(repository.lastGymId, adminUser.gym_id);
  assert.equal(repository.lastUserId, managedBoxer.id);
});

test("getAdminUserForApi validates ids and returns not found", async () => {
  const invalid = await getAdminUserForApi(adminUser, createRepository(), "not-a-uuid");

  assert.equal(invalid.statusCode, 400);
  assert.deepEqual(invalid.body, {
    error: {
      code: "bad_request",
      details: {},
      message: "User id is invalid"
    }
  });

  const missing = await getAdminUserForApi(
    adminUser,
    createRepository(),
    "00000000-0000-4000-8000-000000000099"
  );

  assert.equal(missing.statusCode, 404);
  assert.deepEqual(missing.body, {
    error: {
      code: "not_found",
      details: {},
      message: "User was not found"
    }
  });
});
