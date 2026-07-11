/**
 * -------------------------------------------------------
 * EduCore Identity Service
 * Proyecto Fénix
 * -------------------------------------------------------
 *
 * Responsable:
 * Administrar el contexto del usuario autenticado.
 *
 * No realiza autenticación.
 * No consulta Firebase.
 * No conoce la interfaz.
 *
 * Es el punto único de identidad del sistema.
 */

export interface UserIdentity {
  uid: string;
  name: string;
  email: string;

  organization: {
    id: string;
    name: string;
  };

  role: {
    id: string;
    name: string;
  };

  permissions: string[];
}

export class IdentityService {
  private currentUser: UserIdentity | null = null;

  setCurrentUser(user: UserIdentity): void {
    this.currentUser = user;
  }

  clear(): void {
    this.currentUser = null;
  }

  getCurrentUser(): UserIdentity | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasPermission(permission: string): boolean {
    if (!this.currentUser) {
      return false;
    }

    return this.currentUser.permissions.includes(permission);
  }
}