import type { UserIdentity } from '../core/identity/identity';

export type AppRole =
  | 'superadmin'
  | 'admin'
  | 'director'
  | 'coordinator'
  | 'uaa'
  | 'multicopy'
  | 'teacher';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: UserIdentity;
}

export interface AuthGateway {
  signIn(credentials: AuthCredentials): Promise<AuthResult>;
  signOut(): Promise<void>;
  restoreSession(): Promise<UserIdentity | null>;
}
