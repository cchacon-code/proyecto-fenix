import { EduCore } from '../core/educore';
import type { UserIdentity } from '../core/identity/identity';

interface SessionPanelProps {
  currentUser: UserIdentity | null;
  onStartSession: () => void;
  onCloseSession: () => void;
}

export function SessionPanel({
  currentUser,
  onStartSession,
  onCloseSession,
}: SessionPanelProps) {
  const currentOrganization =
    EduCore.organization.getOrganization();

  const puedeEditar = currentUser
    ? EduCore.permissions.has(
        currentUser.permissions,
        'planning.edit',
      )
    : false;

  const puedeAdministrar = currentUser
    ? EduCore.permissions.has(
        currentUser.permissions,
        'admin.manage',
      )
    : false;

  const puedeEliminarColegio = currentUser
    ? EduCore.permissions.has(
        currentUser.permissions,
        'school.delete',
      )
    : false;

  if (!currentUser) {
    return (
      <section className="session-panel">
        <p>No existe una sesión activa.</p>

        <button type="button" onClick={onStartSession}>
          Iniciar sesión de prueba
        </button>
      </section>
    );
  }

  return (
    <section className="session-panel">
      <h2>Sesión activa</h2>

      <p>
        <strong>Nombre:</strong> {currentUser.name}
      </p>

      <p>
        <strong>Correo:</strong> {currentUser.email}
      </p>

      <p>
        <strong>Institución:</strong>{' '}
        {currentOrganization?.name}
      </p>

      <p>
        <strong>Rol:</strong> {currentUser.role.name}
      </p>

      <p>
        <strong>Comuna:</strong>{' '}
        {currentOrganization?.commune}
      </p>

      <p>
        <strong>Región:</strong>{' '}
        {currentOrganization?.region}
      </p>

      <div className="status-card">
        <p>
          Editar planificaciones:{' '}
          {puedeEditar ? '✅ Permitido' : '❌ No permitido'}
        </p>

        <p>
          Administrar plataforma:{' '}
          {puedeAdministrar
            ? '✅ Permitido'
            : '❌ No permitido'}
        </p>

        <p>
          Eliminar colegio:{' '}
          {puedeEliminarColegio
            ? '✅ Permitido'
            : '❌ No permitido'}
        </p>
      </div>

      <button type="button" onClick={onCloseSession}>
        Cerrar sesión
      </button>
    </section>
  );
}