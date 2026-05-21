"use client";

import { authorizeAuthUser } from "@boxpulse/shared/auth";
import type { AuthUser } from "@boxpulse/shared/types";
import type { ReactNode } from "react";

import { useWebAuthSession, type WebAuthUser } from "./auth-session";

type AdminRouteGuardProps = {
  children: ReactNode;
};

function toAuthUser(user: WebAuthUser): AuthUser | null {
  if (!user.role || !user.gym_id || typeof user.is_active !== "boolean") {
    return null;
  }

  return {
    email: user.email,
    gym_id: user.gym_id,
    id: user.id,
    is_active: user.is_active,
    role: user.role
  };
}

function AccessState({ title, message }: { title: string; message: string }) {
  return (
    <main className="guard-page">
      <section className="status-panel" aria-live="polite">
        <h1>{title}</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isLoading, user } = useWebAuthSession();

  if (isLoading) {
    return <AccessState title="Validando acceso" message="Estamos verificando tu sesión." />;
  }

  if (!user) {
    return (
      <AccessState title="Acceso restringido" message="Iniciá sesión para entrar al área admin." />
    );
  }

  if (user.is_active === false) {
    return (
      <AccessState
        title="Usuario inactivo"
        message="Tu usuario no tiene acceso activo. Contactá al administrador del gimnasio."
      />
    );
  }

  const authUser = toAuthUser(user);

  if (!authUser) {
    return (
      <AccessState
        title="No pudimos validar tu acceso"
        message="Tu sesión no tiene los permisos necesarios para entrar al área admin."
      />
    );
  }

  const authorization = authorizeAuthUser(authUser, ["admin"]);

  if (!authorization.ok) {
    return (
      <AccessState title="Acceso denegado" message="No tenés permisos para entrar al área admin." />
    );
  }

  return <>{children}</>;
}
