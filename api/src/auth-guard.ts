import { authorizeAuthUser, type AuthAuthorizationFailure } from "@boxpulse/shared/auth";
import type { AuthUser, UserRole } from "@boxpulse/shared/types";

type ApiErrorBody = {
  error: {
    code: string;
    details: Record<string, never>;
    message: string;
  };
};

export type ApiAuthGuardFailure = {
  body: ApiErrorBody;
  statusCode: 401 | 403;
};

export type ApiAuthGuardResult =
  | {
      ok: true;
      user: AuthUser;
    }
  | {
      ok: false;
      response: ApiAuthGuardFailure;
    };

function getAuthFailureStatusCode(
  error: AuthAuthorizationFailure
): ApiAuthGuardFailure["statusCode"] {
  return error.code === "unauthenticated" ? 401 : 403;
}

export function createAuthGuardFailureResponse(
  error: AuthAuthorizationFailure
): ApiAuthGuardFailure {
  return {
    body: {
      error: {
        code: error.code,
        details: {},
        message: error.message
      }
    },
    statusCode: getAuthFailureStatusCode(error)
  };
}

export function requireApiAuthUser(
  user: AuthUser | null | undefined,
  allowedRoles: readonly UserRole[]
): ApiAuthGuardResult {
  const result = authorizeAuthUser(user, allowedRoles);

  if (result.ok) {
    return result;
  }

  return {
    ok: false,
    response: createAuthGuardFailureResponse(result.error)
  };
}
