import type { AuthUser, UserRole } from "../types/index.js";

export type AuthAuthorizationFailureCode = "unauthenticated" | "inactive_user" | "forbidden_role";

export type AuthAuthorizationFailure = {
  code: AuthAuthorizationFailureCode;
  message: string;
};

export type AuthAuthorizationResult =
  | {
      ok: true;
      user: AuthUser;
    }
  | {
      ok: false;
      error: AuthAuthorizationFailure;
    };

export function isActiveAuthUser(user: Pick<AuthUser, "is_active">): boolean {
  return user.is_active;
}

export function hasAllowedRole(
  user: Pick<AuthUser, "role">,
  allowedRoles: readonly UserRole[]
): boolean {
  return allowedRoles.includes(user.role);
}

export function canAccessWithRole(
  user: Pick<AuthUser, "is_active" | "role">,
  allowedRoles: readonly UserRole[]
): boolean {
  return isActiveAuthUser(user) && hasAllowedRole(user, allowedRoles);
}

export function requireActiveAuthUser(user: AuthUser | null | undefined): AuthAuthorizationResult {
  if (!user) {
    return {
      error: {
        code: "unauthenticated",
        message: "Authentication is required"
      },
      ok: false
    };
  }

  if (!isActiveAuthUser(user)) {
    return {
      error: {
        code: "inactive_user",
        message: "Inactive users cannot access BoxPulse"
      },
      ok: false
    };
  }

  return {
    ok: true,
    user
  };
}

export function authorizeAuthUser(
  user: AuthUser | null | undefined,
  allowedRoles: readonly UserRole[]
): AuthAuthorizationResult {
  const activeUserResult = requireActiveAuthUser(user);

  if (!activeUserResult.ok) {
    return activeUserResult;
  }

  if (!hasAllowedRole(activeUserResult.user, allowedRoles)) {
    return {
      error: {
        code: "forbidden_role",
        message: "User role is not allowed to access this resource"
      },
      ok: false
    };
  }

  return activeUserResult;
}
