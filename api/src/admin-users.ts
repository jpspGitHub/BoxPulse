import type { Request, Response, Router } from "express";
import express from "express";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import {
  adminCreateUserRequestSchema,
  adminCreateUserResponseSchema,
  adminUserDetailResponseSchema,
  adminUsersListQuerySchema,
  adminUsersListResponseSchema,
  authUserSchema,
  uuidSchema
} from "@boxpulse/shared/schemas";
import type {
  AdminCreateUserRequest,
  AdminUser,
  AdminUsersListResponse,
  AuthUser,
  UserRole
} from "@boxpulse/shared/types";

import { type ApiAuthGuardFailure, requireApiAuthUser } from "./auth-guard.js";
import { createApiSupabaseClient } from "./supabase.js";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const ADMIN_ALLOWED_ROLES = ["admin"] as const satisfies readonly UserRole[];

type ApiErrorBody = ApiAuthGuardFailure["body"];

type ApiResult<TBody> =
  | {
      body: TBody;
      statusCode: 200 | 201;
    }
  | {
      body: ApiErrorBody;
      statusCode: 400 | 401 | 403 | 404 | 500;
    };

type AdminUsersPage = {
  data: AdminUser[];
  total: number;
};

export type AdminUsersRepository = {
  createAdminUser(gymId: string, request: AdminCreateUserRequest): Promise<AdminUser>;
  getAdminUserById(gymId: string, userId: string): Promise<AdminUser | null>;
  listAdminUsers(gymId: string, page: number, pageSize: number): Promise<AdminUsersPage>;
};

export type RequestAuthUserResolver = (request: Request) => Promise<AuthUser | null>;

function createApiError(code: string, message: string): ApiErrorBody {
  return {
    error: {
      code,
      details: {},
      message
    }
  };
}

function badRequest(message: string): ApiResult<never> {
  return {
    body: createApiError("bad_request", message),
    statusCode: 400
  };
}

function notFound(message: string): ApiResult<never> {
  return {
    body: createApiError("not_found", message),
    statusCode: 404
  };
}

function internalError(): ApiResult<never> {
  return {
    body: createApiError("internal_server_error", "No pudimos obtener los usuarios. Intentá nuevamente."),
    statusCode: 500
  };
}

function duplicateEmail(): ApiResult<never> {
  return {
    body: createApiError("duplicate_email", "Ya existe un usuario con ese email."),
    statusCode: 400
  };
}

function requireAdmin(user: AuthUser | null | undefined): ApiResult<never> | { user: AuthUser } {
  const authResult = requireApiAuthUser(user, ADMIN_ALLOWED_ROLES);

  if (!authResult.ok) {
    return authResult.response;
  }

  return { user: authResult.user };
}

function parsePagination(query: unknown): { page: number; pageSize: number } | ApiResult<never> {
  const result = adminUsersListQuerySchema.safeParse(query);

  if (!result.success) {
    return badRequest("Pagination parameters are invalid");
  }

  return {
    page: result.data.page ?? DEFAULT_PAGE,
    pageSize: result.data.page_size ?? DEFAULT_PAGE_SIZE
  };
}

export async function listAdminUsersForApi(
  user: AuthUser | null | undefined,
  repository: AdminUsersRepository,
  query: unknown
): Promise<ApiResult<AdminUsersListResponse>> {
  const auth = requireAdmin(user);

  if ("statusCode" in auth) {
    return auth;
  }

  const pagination = parsePagination(query);

  if ("statusCode" in pagination) {
    return pagination;
  }

  try {
    const page = await repository.listAdminUsers(auth.user.gym_id, pagination.page, pagination.pageSize);
    const body = adminUsersListResponseSchema.parse({
      data: page.data,
      pagination: {
        page: pagination.page,
        page_size: pagination.pageSize,
        total: page.total
      }
    });

    return {
      body,
      statusCode: 200
    };
  } catch {
    return internalError();
  }
}

export async function getAdminUserForApi(
  user: AuthUser | null | undefined,
  repository: AdminUsersRepository,
  userId: string
): Promise<ApiResult<AdminUser>> {
  const auth = requireAdmin(user);

  if ("statusCode" in auth) {
    return auth;
  }

  const parsedUserId = uuidSchema.safeParse(userId);

  if (!parsedUserId.success) {
    return badRequest("User id is invalid");
  }

  try {
    const adminUser = await repository.getAdminUserById(auth.user.gym_id, parsedUserId.data);

    if (!adminUser) {
      return notFound("User was not found");
    }

    return {
      body: adminUserDetailResponseSchema.parse(adminUser),
      statusCode: 200
    };
  } catch {
    return internalError();
  }
}

export async function createAdminUserForApi(
  user: AuthUser | null | undefined,
  repository: AdminUsersRepository,
  body: unknown
): Promise<ApiResult<AdminUser>> {
  const auth = requireAdmin(user);

  if ("statusCode" in auth) {
    return auth;
  }

  const request = adminCreateUserRequestSchema.safeParse(body);

  if (!request.success) {
    return badRequest("User payload is invalid");
  }

  try {
    const adminUser = await repository.createAdminUser(auth.user.gym_id, request.data);

    return {
      body: adminCreateUserResponseSchema.parse(adminUser),
      statusCode: 201
    };
  } catch (error) {
    if (error instanceof Error && error.message === "duplicate_email") {
      return duplicateEmail();
    }

    return internalError();
  }
}

const authUserMembershipRowSchema = z.object({
  gym_id: uuidSchema,
  role: z.enum(["admin", "coach", "boxer"])
});

const adminUserMembershipRowSchema = z.object({
  role: z.enum(["coach", "boxer"]),
  user_id: uuidSchema
});

const userRowSchema = z.object({
  email: z.string().email(),
  id: uuidSchema,
  is_active: z.boolean()
});

const profileRowSchema = z.object({
  first_name: z.string().trim().min(1),
  id: uuidSchema,
  last_name: z.string().trim().min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional().nullable(),
  phone: z.string().trim().min(1).optional().nullable(),
  user_id: uuidSchema
});

function throwSupabaseError(error: { message: string } | null) {
  if (error) {
    throw new Error(error.message);
  }
}

function mapAdminUser(
  membership: z.infer<typeof adminUserMembershipRowSchema>,
  user: z.infer<typeof userRowSchema>,
  profile: z.infer<typeof profileRowSchema>
): AdminUser {
  return {
    email: user.email,
    id: user.id,
    is_active: user.is_active,
    profile: {
      first_name: profile.first_name,
      id: profile.id,
      last_name: profile.last_name,
      level: membership.role === "boxer" ? (profile.level ?? null) : null,
      phone: profile.phone ?? null
    },
    role: membership.role
  };
}

export class SupabaseAdminUsersRepository implements AdminUsersRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async createAdminUser(gymId: string, request: AdminCreateUserRequest): Promise<AdminUser> {
    await this.ensureEmailIsAvailable(request.email);

    const user = await this.insertUser(request.email);
    await this.insertGymMembership(gymId, user.id, request.role);
    const profile = await this.insertProfile(gymId, user.id, request);

    return mapAdminUser(
      {
        role: request.role,
        user_id: user.id
      },
      user,
      profile
    );
  }

  async listAdminUsers(gymId: string, page: number, pageSize: number): Promise<AdminUsersPage> {
    const offset = (page - 1) * pageSize;
    const lastIndex = offset + pageSize - 1;

    const membershipResult = await this.supabase
      .from("gym_members")
      .select("user_id, role", { count: "exact" })
      .eq("gym_id", gymId)
      .in("role", ["coach", "boxer"])
      .range(offset, lastIndex);

    throwSupabaseError(membershipResult.error);

    const memberships = z.array(adminUserMembershipRowSchema).parse(membershipResult.data ?? []);
    const users = await this.findUsers(memberships.map((membership) => membership.user_id));
    const profiles = await this.findProfiles(gymId, memberships);

    return {
      data: memberships.flatMap((membership) => {
        const user = users.get(membership.user_id);
        const profile = profiles.get(membership.user_id);

        return user && profile ? [mapAdminUser(membership, user, profile)] : [];
      }),
      total: membershipResult.count ?? 0
    };
  }

  async getAdminUserById(gymId: string, userId: string): Promise<AdminUser | null> {
    const membershipResult = await this.supabase
      .from("gym_members")
      .select("user_id, role")
      .eq("gym_id", gymId)
      .eq("user_id", userId)
      .in("role", ["coach", "boxer"])
      .maybeSingle();

    throwSupabaseError(membershipResult.error);

    if (!membershipResult.data) {
      return null;
    }

    const membership = adminUserMembershipRowSchema.parse(membershipResult.data);
    const users = await this.findUsers([membership.user_id]);
    const profiles = await this.findProfiles(gymId, [membership]);
    const user = users.get(membership.user_id);
    const profile = profiles.get(membership.user_id);

    return user && profile ? mapAdminUser(membership, user, profile) : null;
  }

  private async findUsers(userIds: string[]) {
    if (userIds.length === 0) {
      return new Map<string, z.infer<typeof userRowSchema>>();
    }

    const usersResult = await this.supabase
      .from("users")
      .select("id, email, is_active")
      .in("id", userIds);

    throwSupabaseError(usersResult.error);

    return new Map(
      z.array(userRowSchema).parse(usersResult.data ?? []).map((user) => [user.id, user])
    );
  }

  private async findProfiles(
    gymId: string,
    memberships: z.infer<typeof adminUserMembershipRowSchema>[]
  ) {
    const profiles = new Map<string, z.infer<typeof profileRowSchema>>();
    const coachIds = memberships
      .filter((membership) => membership.role === "coach")
      .map((membership) => membership.user_id);
    const boxerIds = memberships
      .filter((membership) => membership.role === "boxer")
      .map((membership) => membership.user_id);

    for (const profile of await this.findProfileRows("coach_profiles", gymId, coachIds)) {
      profiles.set(profile.user_id, profile);
    }

    for (const profile of await this.findProfileRows("boxer_profiles", gymId, boxerIds)) {
      profiles.set(profile.user_id, profile);
    }

    return profiles;
  }

  private async findProfileRows(table: "coach_profiles" | "boxer_profiles", gymId: string, userIds: string[]) {
    if (userIds.length === 0) {
      return [];
    }

    const selectedColumns =
      table === "boxer_profiles"
        ? "id, user_id, first_name, last_name, phone, level"
        : "id, user_id, first_name, last_name, phone";

    const profileResult = await this.supabase
      .from(table)
      .select(selectedColumns)
      .eq("gym_id", gymId)
      .in("user_id", userIds);

    throwSupabaseError(profileResult.error);

    return z.array(profileRowSchema).parse(profileResult.data ?? []);
  }

  private async ensureEmailIsAvailable(email: string) {
    const existingUser = await this.supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    throwSupabaseError(existingUser.error);

    if (existingUser.data) {
      throw new Error("duplicate_email");
    }
  }

  private async insertUser(email: string) {
    const result = await this.supabase
      .from("users")
      .insert({
        email,
        is_active: true
      })
      .select("id, email, is_active")
      .single();

    throwSupabaseError(result.error);

    return userRowSchema.parse(result.data);
  }

  private async insertGymMembership(gymId: string, userId: string, role: "coach" | "boxer") {
    const result = await this.supabase.from("gym_members").insert({
      gym_id: gymId,
      role,
      user_id: userId
    });

    throwSupabaseError(result.error);
  }

  private async insertProfile(gymId: string, userId: string, request: AdminCreateUserRequest) {
    const baseProfile = {
      first_name: request.first_name,
      gym_id: gymId,
      last_name: request.last_name,
      phone: request.phone ?? null,
      user_id: userId
    };

    const result =
      request.role === "coach"
        ? await this.supabase
            .from("coach_profiles")
            .insert(baseProfile)
            .select("id, user_id, first_name, last_name, phone")
            .single()
        : await this.supabase
            .from("boxer_profiles")
            .insert({
              ...baseProfile,
              level: request.level ?? null
            })
            .select("id, user_id, first_name, last_name, phone, level")
            .single();

    throwSupabaseError(result.error);

    return profileRowSchema.parse(result.data);
  }
}

function getBearerToken(request: Request): string | null {
  const authorization = request.header("authorization");

  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.split(" ");

  return scheme?.toLowerCase() === "bearer" && token ? token : null;
}

export function createSupabaseAuthUserResolver(supabase: SupabaseClient): RequestAuthUserResolver {
  return async (request) => {
    const token = getBearerToken(request);

    if (!token) {
      return null;
    }

    const authResult = await supabase.auth.getUser(token);
    throwSupabaseError(authResult.error);

    const authUserId = authResult.data.user?.id;

    if (!authUserId) {
      return null;
    }

    const userResult = await supabase
      .from("users")
      .select("id, email, is_active")
      .eq("id", authUserId)
      .maybeSingle();
    throwSupabaseError(userResult.error);

    const membershipResult = await supabase
      .from("gym_members")
      .select("gym_id, role")
      .eq("user_id", authUserId)
      .maybeSingle();
    throwSupabaseError(membershipResult.error);

    if (!userResult.data || !membershipResult.data) {
      return null;
    }

    const user = userRowSchema.parse(userResult.data);
    const membership = authUserMembershipRowSchema.parse(membershipResult.data);

    return authUserSchema.parse({
      email: user.email,
      gym_id: membership.gym_id,
      id: user.id,
      is_active: user.is_active,
      role: membership.role
    });
  };
}

type AdminUsersRouterDependencies = {
  getAuthUser?: RequestAuthUserResolver;
  repository?: AdminUsersRepository;
  supabase?: SupabaseClient;
};

function getDefaultSupabase(supabase?: SupabaseClient) {
  return supabase ?? createApiSupabaseClient();
}

function sendApiResult<TBody>(response: Response, result: ApiResult<TBody>) {
  response.status(result.statusCode).json(result.body);
}

async function resolveAuthUser(getAuthUser: RequestAuthUserResolver, request: Request) {
  try {
    return await getAuthUser(request);
  } catch {
    return null;
  }
}

export function createAdminUsersRouter(dependencies: AdminUsersRouterDependencies = {}): Router {
  const router = express.Router();
  const getSupabase = () => getDefaultSupabase(dependencies.supabase);
  const getRepository = () =>
    dependencies.repository ?? new SupabaseAdminUsersRepository(getSupabase());
  const getAuthUser =
    dependencies.getAuthUser ?? ((request: Request) => createSupabaseAuthUserResolver(getSupabase())(request));

  router.get("/", async (request, response) => {
    sendApiResult(
      response,
      await listAdminUsersForApi(await resolveAuthUser(getAuthUser, request), getRepository(), request.query)
    );
  });

  router.post("/", async (request, response) => {
    sendApiResult(
      response,
      await createAdminUserForApi(
        await resolveAuthUser(getAuthUser, request),
        getRepository(),
        request.body
      )
    );
  });

  router.get("/:userId", async (request, response) => {
    sendApiResult(
      response,
      await getAdminUserForApi(
        await resolveAuthUser(getAuthUser, request),
        getRepository(),
        request.params.userId
      )
    );
  });

  return router;
}
