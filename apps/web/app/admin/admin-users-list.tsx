"use client";

import { adminUsersListResponseSchema } from "@boxpulse/shared/schemas";
import type { AdminUser, AdminUsersListResponse } from "@boxpulse/shared/types";
import { useEffect, useMemo, useState } from "react";

import { useWebAuthSession } from "../../lib/auth-session";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";
const loadUsersErrorMessage = "No pudimos cargar los usuarios. Intentá nuevamente.";

type AdminUsersState =
  | {
      status: "loading";
      users: AdminUser[];
    }
  | {
      message: string;
      status: "error";
      users: AdminUser[];
    }
  | {
      status: "ready";
      users: AdminUser[];
    };

function getProfileName(user: AdminUser) {
  return `${user.profile.first_name} ${user.profile.last_name}`.trim();
}

function getRoleLabel(role: AdminUser["role"]) {
  return role === "coach" ? "Coach" : "Boxer";
}

function getLevelLabel(user: AdminUser) {
  if (user.role !== "boxer") {
    return "-";
  }

  if (!user.profile.level) {
    return "Sin nivel";
  }

  const labels = {
    advanced: "Avanzado",
    beginner: "Principiante",
    intermediate: "Intermedio"
  } satisfies Record<NonNullable<AdminUser["profile"]["level"]>, string>;

  return labels[user.profile.level];
}

function parseAdminUsersResponse(body: unknown): AdminUsersListResponse {
  return adminUsersListResponseSchema.parse(body);
}

export function AdminUsersList() {
  const { accessToken } = useWebAuthSession();
  const [state, setState] = useState<AdminUsersState>({
    status: "loading",
    users: []
  });

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const controller = new AbortController();

    setState({
      status: "loading",
      users: []
    });

    fetch(`${apiBaseUrl}/admin/users?page=1&page_size=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      signal: controller.signal
    })
      .then(async (response) => {
        const body: unknown = await response.json();

        if (!response.ok) {
          throw new Error(loadUsersErrorMessage);
        }

        return parseAdminUsersResponse(body);
      })
      .then((body) => {
        setState({
          status: "ready",
          users: body.data
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          message:
            error instanceof Error && error.message === loadUsersErrorMessage
              ? error.message
              : loadUsersErrorMessage,
          status: "error",
          users: []
        });
      });

    return () => {
      controller.abort();
    };
  }, [accessToken]);

  const activeCount = useMemo(
    () => state.users.filter((user) => user.is_active).length,
    [state.users]
  );

  if (!accessToken) {
    return (
      <section className="admin-state" aria-live="polite">
        <h2>Preparando sesión</h2>
        <p>Estamos validando tus credenciales para cargar usuarios.</p>
      </section>
    );
  }

  if (state.status === "loading") {
    return (
      <section className="admin-state" aria-live="polite">
        <h2>Cargando usuarios</h2>
        <p>Estamos consultando coaches y boxers del gimnasio.</p>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="admin-state admin-state-error" aria-live="polite">
        <h2>No pudimos cargar la lista</h2>
        <p>{state.message}</p>
      </section>
    );
  }

  if (state.users.length === 0) {
    return (
      <section className="admin-state" aria-live="polite">
        <h2>No hay usuarios cargados</h2>
        <p>Cuando el gimnasio tenga coaches o boxers, van a aparecer acá.</p>
      </section>
    );
  }

  return (
    <section className="admin-users-section" aria-label="Usuarios del gimnasio">
      <div className="admin-users-summary" aria-label="Resumen de usuarios">
        <div>
          <span>Total</span>
          <strong>{state.users.length}</strong>
        </div>
        <div>
          <span>Activos</span>
          <strong>{activeCount}</strong>
        </div>
        <div>
          <span>Inactivos</span>
          <strong>{state.users.length - activeCount}</strong>
        </div>
      </div>

      <div className="admin-users-table-wrap">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Rol</th>
              <th scope="col">Nivel</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => (
              <tr key={user.id}>
                <td>
                  <span className="admin-user-name">{getProfileName(user)}</span>
                  <span className="admin-user-email">{user.email}</span>
                </td>
                <td>{getRoleLabel(user.role)}</td>
                <td>{getLevelLabel(user)}</td>
                <td>{user.profile.phone ?? "-"}</td>
                <td>
                  <span
                    className={
                      user.is_active
                        ? "admin-status-badge admin-status-active"
                        : "admin-status-badge admin-status-inactive"
                    }
                  >
                    {user.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
