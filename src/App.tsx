import { useState } from 'react';

import { EduCore } from './core/educore';
import type { UserIdentity } from './core/identity/identity';
import type { Organization } from './core/organization/organization';

const usuarioEjemplo: UserIdentity = {
  uid: 'usr-carlos-001',
  name: 'Carlos Chacón',
  email: 'cchacon@colegioeducenter.cl',

  organization: {
    id: 'org-educenter',
    name: 'Colegio Particular Educenter',
  },

  role: {
    id: 'admin',
    name: 'Administrador',
  },

  permissions: [
    'planning.view',
    'planning.create',
    'planning.edit',
    'planning.approve',
    'dashboard.view',
    'admin.manage',
  ],
};

const organizacionEjemplo: Organization = {
  id: 'org-educenter',
  name: 'Colegio Particular Educenter',
  rut: '76.000.000-0',
  country: 'Chile',
  region: 'Valparaíso',
  commune: 'Calle Larga',
  active: true,
};

EduCore.organization.setOrganization(organizacionEjemplo);

const savedUser = EduCore.session.load();

if (savedUser) {
  EduCore.identity.setCurrentUser(savedUser);
}

export function App() {
  const [currentUser, setCurrentUser] = useState(
    EduCore.identity.getCurrentUser(),
  );

  const currentOrganization = EduCore.organization.getOrganization();

  function startSession(): void {
    EduCore.identity.setCurrentUser(usuarioEjemplo);
    EduCore.session.save(usuarioEjemplo);
    setCurrentUser(usuarioEjemplo);
  }

  function closeSession(): void {
    EduCore.identity.clear();
    EduCore.session.clear();
    setCurrentUser(null);
  }

  const puedeEditar = EduCore.identity.hasPermission('planning.edit');
  const puedeAdministrar = EduCore.identity.hasPermission('admin.manage');
  const puedeEliminarColegio =
    EduCore.identity.hasPermission('school.delete');

  return (
    <main className="app-shell">
      <section className="hero">
        <span>Proyecto Fénix · EduCore Session</span>

        <h1>Más tiempo para educar.</h1>

        {currentUser ? (
          <>
            <h2>Sesión activa</h2>

            <p>
              <strong>Nombre:</strong> {currentUser.name}
            </p>

            <p>
              <strong>Correo:</strong> {currentUser.email}
            </p>

            <p>
              <strong>Institución:</strong>{' '}
              {currentUser.organization.name}
            </p>

            <p>
  <strong>Rol:</strong> {currentUser.role.name}
</p>

<p>
  <strong>Comuna:</strong> {currentOrganization?.commune}
</p>

<p>
  <strong>Región:</strong> {currentOrganization?.region}
</p>

            <div className="status-card">
              <p>
                Editar planificaciones:{' '}
                {puedeEditar ? '✅ Permitido' : '❌ No permitido'}
              </p>

              <p>
                Administrar plataforma:{' '}
                {puedeAdministrar ? '✅ Permitido' : '❌ No permitido'}
              </p>

              <p>
                Eliminar colegio:{' '}
                {puedeEliminarColegio ? '✅ Permitido' : '❌ No permitido'}
              </p>
            </div>

            <button type="button" onClick={closeSession}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <p>No existe una sesión activa.</p>

            <button type="button" onClick={startSession}>
              Iniciar sesión de prueba
            </button>
          </>
        )}
      </section>
    </main>
  );
}