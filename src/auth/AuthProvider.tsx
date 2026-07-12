import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import type { UserIdentity } from '../core/identity/identity';
import { FirebaseAuthGateway } from './services/FirebaseAuthGateway';
import type { AuthCredentials, AuthGateway } from './auth.types';

interface AuthContextValue {
  user: UserIdentity | null;
  isLoading: boolean;
  signIn(credentials: AuthCredentials): Promise<void>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const gateway: AuthGateway = new FirebaseAuthGateway();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = gateway.subscribe((nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return unsubscribe;
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
      async resetPassword(email) {
        await gateway.resetPassword(email);
      },
    }),
    [user, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.');
  }

  return context;
}
