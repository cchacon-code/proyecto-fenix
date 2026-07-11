import { EduCore } from '../core/educore';

export function KernelStatus() {
  return (
    <div className="kernel-grid">
      <article className="kernel-card">
        <strong>Identity</strong>
        <span>✅ Activo</span>
      </article>

      <article className="kernel-card">
        <strong>Session</strong>
        <span>
          {EduCore.session.exists()
            ? '✅ Activa'
            : '⚪ Sin sesión'}
        </span>
      </article>

      <article className="kernel-card">
        <strong>Organization</strong>
        <span>
          {EduCore.organization.exists()
            ? '✅ Activa'
            : '❌ Inactiva'}
        </span>
      </article>

      <article className="kernel-card">
        <strong>Permissions</strong>
        <span>✅ Activo</span>
      </article>
    </div>
  );
}