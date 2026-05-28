import { AdminUsersManager } from "./admin-users-manager";

const metrics = [
  { label: "Boxeadores activos", value: "24", note: "+3 este mes" },
  { label: "Coaches", value: "4", note: "2 con actividad hoy" },
  { label: "Entrenos registrados", value: "136", note: "Ultimos 30 dias" },
  { label: "Asistencia promedio", value: "82%", note: "MVP validation" }
];

const activity = [
  "Bolsa por cronometro finalizada por coach Nicolas",
  "Sofia Pereira actualizo progreso fisico",
  "Lucas Cabrera fue asignado a Base tecnica",
  "Coach Valentina creo sesion de manoplas"
];

const programs = [
  { name: "Base tecnica 4 semanas", level: "Intermedio", status: "Activo" },
  { name: "Condicionamiento competitivo", level: "Avanzado", status: "Activo" },
  { name: "Fuerza y core", level: "Principiante", status: "Borrador" }
];

export default function AdminPage() {
  return (
    <main className="admin-page">
      <header className="admin-header admin-hero">
        <div>
          <p className="admin-eyebrow">Administración</p>
          <h1>RoundLab Boxing Gym</h1>
          <p>Panel operativo para usuarios, actividad, programas y validacion del MVP.</p>
        </div>
        <a className="admin-hero-action" href="#users">
          Gestionar usuarios
        </a>
      </header>

      <section className="admin-dashboard-grid" aria-label="Resumen del gimnasio">
        {metrics.map((metric) => (
          <article className="admin-dashboard-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="admin-two-column" aria-label="Actividad y programas">
        <article className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-eyebrow">Actividad</p>
            <h2>Ultimos movimientos</h2>
          </div>
          <div className="admin-activity-list">
            {activity.map((item) => (
              <div className="admin-activity-row" key={item}>
                <span />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-eyebrow">Programas</p>
            <h2>Planes de entrenamiento</h2>
          </div>
          <div className="admin-program-list">
            {programs.map((program) => (
              <div className="admin-program-row" key={program.name}>
                <div>
                  <strong>{program.name}</strong>
                  <p>{program.level}</p>
                </div>
                <span>{program.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="users">
        <header className="admin-header admin-section-header">
          <div>
            <p className="admin-eyebrow">Usuarios</p>
            <h1>Gestion de coaches y boxeadores</h1>
          </div>
        </header>
        <AdminUsersManager />
      </section>
    </main>
  );
}
