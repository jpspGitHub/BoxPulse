import { AdminUsersManager } from "./admin-users-manager";

export default function AdminPage() {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Administración</p>
          <h1>Usuarios del gimnasio</h1>
        </div>
      </header>

      <AdminUsersManager />
    </main>
  );
}
