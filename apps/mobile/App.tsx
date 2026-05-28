import { useState } from "react";

import { AuthSessionProvider } from "./lib/auth-session";
import { MobileRoleGuard } from "./lib/mobile-role-guard";
import { AppContent } from "./src/app-content";
import { HealthProbe } from "./src/components/health-probe";
import { LoginScreen } from "./src/screens/login-screen";

export default function App() {
  const [isDummyLoginComplete, setIsDummyLoginComplete] = useState(false);

  if (!isDummyLoginComplete) {
    return <LoginScreen onContinue={() => setIsDummyLoginComplete(true)} />;
  }

  return (
    <AuthSessionProvider>
      <MobileRoleGuard>
        {(role) => (
          <>
            <AppContent role={role} />
            <HealthProbe />
          </>
        )}
      </MobileRoleGuard>
    </AuthSessionProvider>
  );
}
