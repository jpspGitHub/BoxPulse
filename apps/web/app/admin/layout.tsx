import type { ReactNode } from "react";

import { AdminRouteGuard } from "../../lib/admin-route-guard";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>;
}
