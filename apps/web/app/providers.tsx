"use client";

import type { ReactNode } from "react";

import { AuthSessionProvider } from "../lib/auth-session";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
