import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import type { UserIdentity } from '../core/identity/identity';
import { LocalAuthGateway } from './services/LocalAuthGateway';
import type { AuthCredentials, AuthGateway } from './auth.types';

interface AuthContextValue {
  user: UserIdentity | null;
  isLoading: boolean;
  signIn(credentials: AuthCredentials): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const gateway: AuthGateway = new LocalAuthGateway();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gateway
      .restoreSession()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      async signIn(credentials) {
        const result = await gateway.signIn(credentials);
        setUser(result.user);
      },
      async signOut() {
        await gateway.signOut();
        setUser(null);
      },
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.');
  }

  return context;
}
