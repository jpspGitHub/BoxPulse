import type { AuthUser, UserRole } from "../types/index.js";

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
