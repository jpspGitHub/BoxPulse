"use client";

import {
  adminCreateUserRequestSchema,
  adminCreateUserResponseSchema,
  adminUpdateUserRequestSchema,
  adminUpdateUserResponseSchema
} from "@boxpulse/shared/schemas";
import type {
  AdminCreateUserRequest,
  AdminManagedUserRole,
  AdminUpdateUserRequest,
  AdminUser,
  BoxerLevel
} from "@boxpulse/shared/types";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { useWebAuthSession } from "../../lib/auth-session";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";
const saveErrorMessage = "No pudimos guardar el usuario. Intentá nuevamente.";

type AdminUserFormProps = {
  selectedUser: AdminUser | null;
  onCancelEdit: () => void;
  onSaved: (user: AdminUser) => void;
};

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  level: "" | BoxerLevel;
  phone: string;
  role: AdminManagedUserRole;
};

function getInitialState(user: AdminUser | null): FormState {
  return {
    email: user?.email ?? "",
    firstName: user?.profile.first_name ?? "",
    lastName: user?.profile.last_name ?? "",
    level: user?.role === "boxer" ? (user.profile.level ?? "") : "",
    phone: user?.profile.phone ?? "",
    role: user?.role ?? "boxer"
  };
}

function normalizeOptionalString(value: string) {
  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function getFriendlyError(errorBody: unknown) {
  if (
    typeof errorBody === "object" &&
    errorBody &&
    "error" in errorBody &&
    typeof errorBody.error === "object" &&
    errorBody.error &&
    "code" in errorBody.error &&
    errorBody.error.code === "duplicate_email"
  ) {
    return "Ya existe un usuario con ese email.";
  }

  return saveErrorMessage;
}

export function AdminUserForm({ selectedUser, onCancelEdit, onSaved }: AdminUserFormProps) {
  const { accessToken } = useWebAuthSession();
  const [form, setForm] = useState<FormState>(() => getInitialState(selectedUser));
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const isEditing = Boolean(selectedUser);

  useEffect(() => {
    setForm(getInitialState(selectedUser));
    setMessage(null);
    setStatus("idle");
  }, [selectedUser]);

  const submitLabel = useMemo(() => {
    if (status === "saving") {
      return isEditing ? "Guardando" : "Creando";
    }

    return isEditing ? "Guardar cambios" : "Crear usuario";
  }, [isEditing, status]);

  function updateField<TField extends keyof FormState>(field: TField, value: FormState[TField]) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function buildCreateRequest(): AdminCreateUserRequest {
    const base = {
      email: form.email.trim(),
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      phone: normalizeOptionalString(form.phone),
      role: form.role
    };

    return form.role === "boxer"
      ? {
          ...base,
          level: form.level || null,
          role: "boxer"
        }
      : {
          ...base,
          role: "coach"
        };
  }

  function buildUpdateRequest(): AdminUpdateUserRequest {
    return form.role === "boxer"
      ? {
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          level: form.level || null,
          phone: normalizeOptionalString(form.phone)
        }
      : {
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          phone: normalizeOptionalString(form.phone)
        };
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessToken) {
      setStatus("error");
      setMessage(saveErrorMessage);
      return;
    }

    const request = isEditing ? buildUpdateRequest() : buildCreateRequest();
    const validation = isEditing
      ? adminUpdateUserRequestSchema.safeParse(request)
      : adminCreateUserRequestSchema.safeParse(request);

    if (!validation.success) {
      setStatus("error");
      setMessage("Revisá los campos obligatorios antes de guardar.");
      return;
    }

    setStatus("saving");
    setMessage(null);

    try {
      const response = await fetch(
        isEditing && selectedUser
          ? `${apiBaseUrl}/admin/users/${selectedUser.id}`
          : `${apiBaseUrl}/admin/users`,
        {
          body: JSON.stringify(validation.data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          method: isEditing ? "PATCH" : "POST"
        }
      );
      const body: unknown = await response.json();

      if (!response.ok) {
        throw new Error(getFriendlyError(body));
      }

      const savedUser = isEditing
        ? adminUpdateUserResponseSchema.parse(body)
        : adminCreateUserResponseSchema.parse(body);

      setStatus("success");
      setMessage(isEditing ? "Usuario actualizado." : "Usuario creado.");
      onSaved(savedUser);

      if (!isEditing) {
        setForm(getInitialState(null));
      }
    } catch (error: unknown) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : saveErrorMessage);
    }
  }

  return (
    <section className="admin-form-section" aria-label="Formulario de usuario">
      <div className="admin-form-heading">
        <div>
          <h2>{isEditing ? "Editar usuario" : "Nuevo usuario"}</h2>
          <p>{isEditing ? selectedUser?.email : "Creá coaches o boxers para el gimnasio."}</p>
        </div>
        {isEditing ? (
          <button className="admin-secondary-button" type="button" onClick={onCancelEdit}>
            Cancelar edición
          </button>
        ) : null}
      </div>

      <form className="admin-user-form" onSubmit={submitForm}>
        <label>
          Rol
          <select
            disabled={isEditing}
            value={form.role}
            onChange={(event) =>
              updateField("role", event.target.value === "coach" ? "coach" : "boxer")
            }
          >
            <option value="boxer">Boxer</option>
            <option value="coach">Coach</option>
          </select>
        </label>

        <label>
          Email
          <input
            disabled={isEditing}
            inputMode="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>

        <label>
          Nombre
          <input
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
          />
        </label>

        <label>
          Apellido
          <input
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
          />
        </label>

        <label>
          Teléfono
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </label>

        {form.role === "boxer" ? (
          <label>
            Nivel
            <select
              value={form.level}
              onChange={(event) => updateField("level", event.target.value as FormState["level"])}
            >
              <option value="">Sin nivel</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </label>
        ) : null}

        <div className="admin-form-actions">
          <button className="admin-primary-button" disabled={status === "saving"} type="submit">
            {submitLabel}
          </button>
          {message ? (
            <p
              className={
                status === "error"
                  ? "admin-form-message admin-form-message-error"
                  : "admin-form-message"
              }
              aria-live="polite"
            >
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
