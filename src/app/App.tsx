import { useState } from 'react';

import { EduCore } from '../core/educore';
import type { UserIdentity } from '../core/identity/identity';
import type { Organization } from '../core/organization/organization';

import { Dashboard } from './Dashboard';

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

  return (
    <Dashboard
      currentUser={currentUser}
      onStartSession={startSession}
      onCloseSession={closeSession}
    />
  );
}