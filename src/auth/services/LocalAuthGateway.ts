import { EduCore } from '../../core/educore';
import type { UserIdentity } from '../../core/identity/identity';
import { rolePermissions } from '../permissions';
import type { AppRole, AuthCredentials, AuthGateway, AuthResult } from '../auth.types';

interface LocalAccount {
  email: string;
  password: string;
  name: string;
  role: AppRole;
  roleName: string;
}

const accounts: LocalAccount[] = [
  {
    email: 'admin@edusuite.ai',
    password: 'EduSuite2026!',
    name: 'Carlos Chacón',
    role: 'admin',
    roleName: 'Administrador',
  },
  {
    email: 'coordinacion@edusuite.ai',
    password: 'EduSuite2026!',
    name: 'Coordinación Académica',
    role: 'coordinator',
    roleName: 'Coordinación',
  },
  {
    email: 'docente@edusuite.ai',
    password: 'EduSuite2026!',
    name: 'Docente Demo',
    role: 'teacher',
    roleName: 'Docente',
  },
];

export class LocalAuthGateway implements AuthGateway {
  async signIn(credentials: AuthCredentials): Promise<AuthResult> {
    await new Promise((resolve) => window.setTimeout(resolve, 350));

    const account = accounts.find(
      (item) =>
        item.email.toLowerCase() === credentials.email.trim().toLowerCase() &&
        item.password === credentials.password,
    );

    if (!account) {
      throw new Error('Correo o contraseña incorrectos.');
    }

    const user: UserIdentity = {
      uid: `local-${account.role}`,
      name: account.name,
      email: account.email,
      organization: {
        id: 'org-educenter',
        name: 'Colegio Particular Educenter',
      },
      role: {
        id: account.role,
        name: account.roleName,
      },
      permissions: rolePermissions[account.role],
    };

    EduCore.identity.setCurrentUser(user);
    EduCore.session.save(user);

    return { user };
  }

  async signOut(): Promise<void> {
    EduCore.identity.clear();
    EduCore.session.clear();
  }

  async restoreSession(): Promise<UserIdentity | null> {
    const user = EduCore.session.load();

    if (user) {
      EduCore.identity.setCurrentUser(user);
    }

    return user;
  }
}
