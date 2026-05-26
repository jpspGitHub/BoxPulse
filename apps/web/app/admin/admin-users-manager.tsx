"use client";

import { useState } from "react";

import type { AdminUser } from "@boxpulse/shared/types";

import { AdminUserForm } from "./admin-user-form";
import { AdminUsersList } from "./admin-users-list";

export function AdminUsersManager() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  function refreshUsers() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <>
      <AdminUserForm
        selectedUser={selectedUser}
        onCancelEdit={() => setSelectedUser(null)}
        onSaved={(user) => {
          setSelectedUser(selectedUser ? user : null);
          refreshUsers();
        }}
      />
      <AdminUsersList refreshKey={refreshKey} onEditUser={setSelectedUser} />
    </>
  );
}
