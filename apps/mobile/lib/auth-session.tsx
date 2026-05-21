import type { Session, User } from "@supabase/supabase-js";
import type { UserRole } from "@boxpulse/shared/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";

import { createMobileSupabaseClient } from "./supabase";

type AuthSessionStatus = "loading" | "authenticated" | "unauthenticated";

export type MobileAuthUser = {
  id: string;
  email: string;
  role: UserRole | null;
  gym_id: string | null;
  is_active: boolean | null;
};

type AuthSessionContextValue = {
  accessToken: string | null;
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  status: AuthSessionStatus;
  user: MobileAuthUser | null;
};

const AuthSessionContext = createContext<AuthSessionContextValue | undefined>(undefined);

type AuthSessionProviderProps = {
  children: ReactNode;
};

function readStringMetadata(user: User, key: string): string | null {
  const value = user.app_metadata[key] ?? user.user_metadata[key];

  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function readBooleanMetadata(user: User, key: string): boolean | null {
  const value = user.app_metadata[key] ?? user.user_metadata[key];

  return typeof value === "boolean" ? value : null;
}

function readRole(user: User): UserRole | null {
  const role = readStringMetadata(user, "role");

  return role === "admin" || role === "coach" || role === "boxer" ? role : null;
}

function toMobileAuthUser(user: User): MobileAuthUser {
  return {
    email: user.email ?? "",
    gym_id: readStringMetadata(user, "gym_id"),
    id: user.id,
    is_active: readBooleanMetadata(user, "is_active"),
    role: readRole(user)
  };
}

function getSessionState(session: Session | null) {
  return {
    accessToken: session?.access_token ?? null,
    status: session ? ("authenticated" as const) : ("unauthenticated" as const),
    user: session ? toMobileAuthUser(session.user) : null
  };
}

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [status, setStatus] = useState<AuthSessionStatus>("loading");
  const [user, setUser] = useState<MobileAuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createMobileSupabaseClient> | null>(null);

  const applySession = useCallback((session: Session | null) => {
    const nextState = getSessionState(session);

    setAccessToken(nextState.accessToken);
    setStatus(nextState.status);
    setUser(nextState.user);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let supabase: ReturnType<typeof createMobileSupabaseClient>;

    try {
      supabase = createMobileSupabaseClient();
      supabaseRef.current = supabase;
    } catch (configError: unknown) {
      setError(configError instanceof Error ? configError.message : "Unable to initialize auth");
      applySession(null);
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!isMounted) {
          return;
        }

        if (sessionError) {
          setError(sessionError.message);
          applySession(null);
          return;
        }

        setError(null);
        applySession(data.session);
      })
      .catch((unknownError: unknown) => {
        if (!isMounted) {
          return;
        }

        setError(unknownError instanceof Error ? unknownError.message : "Unable to load session");
        applySession(null);
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setError(null);
      applySession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signOut = useCallback(async () => {
    const supabase = supabaseRef.current ?? createMobileSupabaseClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      throw signOutError;
    }

    setError(null);
    applySession(null);
  }, [applySession]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      accessToken,
      error,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      signOut,
      status,
      user
    }),
    [accessToken, error, signOut, status, user]
  );

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
}

export function useMobileAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useMobileAuthSession must be used within AuthSessionProvider");
  }

  return context;
}
