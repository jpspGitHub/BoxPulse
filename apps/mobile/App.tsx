import { BOXPULSE_APP_NAME } from "@boxpulse/shared/constants";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthSessionProvider } from "./lib/auth-session";
import { MobileRoleGuard, type MobileAppRole } from "./lib/mobile-role-guard";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";

function getRoleTitle(role: MobileAppRole) {
  return role === "coach" ? "Experiencia coach" : "Experiencia boxer";
}

function getRoleDescription(role: MobileAppRole) {
  return role === "coach"
    ? "Acceso mobile habilitado para operar entrenamientos."
    : "Acceso mobile habilitado para consultar progreso y actividad.";
}

function AppContent({ role }: { role: MobileAppRole }) {
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Healthcheck failed");
        }

        return response.json() as Promise<{ status?: string }>;
      })
      .then((body) => setApiStatus(body.status ?? "unknown"))
      .catch(() => setApiStatus("unavailable"));

    return () => controller.abort();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.panel}>
        <Text style={styles.title}>{getRoleTitle(role)}</Text>
        <Text style={styles.description}>{getRoleDescription(role)}</Text>
        <Text style={styles.appName}>{BOXPULSE_APP_NAME} Mobile is running</Text>
        <Text style={styles.status}>API status: {apiStatus}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AuthSessionProvider>
      <MobileRoleGuard>{(role) => <AppContent role={role} />}</MobileRoleGuard>
    </AuthSessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#101820",
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  panel: {
    backgroundColor: "#152331",
    borderColor: "#2a3947",
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
    width: "100%"
  },
  appName: {
    color: "#d7dee7",
    fontSize: 16,
    marginBottom: 12
  },
  description: {
    color: "#f8fafc",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16
  },
  status: {
    color: "#d7dee7",
    fontSize: 18
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 16
  }
});
