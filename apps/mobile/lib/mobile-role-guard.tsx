import { authorizeAuthUser } from "@boxpulse/shared/auth";
import type { AuthUser } from "@boxpulse/shared/types";
import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useMobileAuthSession, type MobileAuthUser } from "./auth-session";

export type MobileAppRole = "coach" | "boxer";

type MobileRoleGuardProps = {
  children: (role: MobileAppRole) => ReactNode;
};

function toAuthUser(user: MobileAuthUser): AuthUser | null {
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
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

export function MobileRoleGuard({ children }: MobileRoleGuardProps) {
  const { isLoading, user } = useMobileAuthSession();

  if (isLoading) {
    return <AccessState title="Validando acceso" message="Estamos verificando tu sesión." />;
  }

  if (!user) {
    return (
      <AccessState
        title="Acceso restringido"
        message="Iniciá sesión para entrar a la app mobile."
      />
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
        message="Tu sesión no tiene los permisos necesarios para entrar a la app mobile."
      />
    );
  }

  const authorization = authorizeAuthUser(authUser, ["coach", "boxer"]);

  if (!authorization.ok || (authUser.role !== "coach" && authUser.role !== "boxer")) {
    return (
      <AccessState
        title="Acceso denegado"
        message="Tu rol no tiene permisos para usar la app mobile."
      />
    );
  }

  return <>{children(authUser.role)}</>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#101820",
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  message: {
    color: "#d7dee7",
    fontSize: 18,
    lineHeight: 24
  },
  panel: {
    backgroundColor: "#152331",
    borderColor: "#2a3947",
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
    width: "100%"
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 16
  }
});
