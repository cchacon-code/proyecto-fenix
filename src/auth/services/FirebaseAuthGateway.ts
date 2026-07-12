import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { firebaseAuth } from '../../cloud/firebase';
import { EduCore } from '../../core/educore';
import type { UserIdentity } from '../../core/identity/identity';
import { cloudBootstrapService } from '../../cloud/bootstrap';
import type {
  AuthCredentials,
  AuthGateway,
  AuthResult,
} from '../auth.types';

function translateFirebaseError(error: unknown): Error {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error
      : new Error('Ocurrió un error inesperado.');
  }

  const messages: Record<string, string> = {
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/invalid-email': 'El correo ingresado no es válido.',
    'auth/user-disabled': 'Esta cuenta se encuentra deshabilitada.',
    'auth/too-many-requests':
      'Se realizaron demasiados intentos. Intenta nuevamente más tarde.',
    'auth/network-request-failed':
      'No fue posible conectar con Firebase. Revisa tu conexión.',
    'auth/missing-password': 'Debes ingresar una contraseña.',
  };

  return new Error(
    messages[error.code] ?? 'No fue posible completar la operación.',
  );
}

export class FirebaseAuthGateway implements AuthGateway {
  async signIn(credentials: AuthCredentials): Promise<AuthResult> {
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        credentials.email.trim(),
        credentials.password,
      );

      const user = await cloudBootstrapService.resolveIdentity(result.user);

      return { user };
    } catch (error) {
      throw translateFirebaseError(error);
    }
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(firebaseAuth);
    EduCore.identity.clear();
    EduCore.session.clear();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(firebaseAuth, email.trim());
    } catch (error) {
      throw translateFirebaseError(error);
    }
  }

  subscribe(callback: (user: UserIdentity | null) => void): () => void {
    return onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!firebaseUser) {
        EduCore.identity.clear();
        callback(null);
        return;
      }

      try {
        const user = await cloudBootstrapService.resolveIdentity(firebaseUser);
        EduCore.identity.setCurrentUser(user);
        callback(user);
      } catch (error) {
        console.error('No fue posible cargar la identidad cloud.', error);
        EduCore.identity.clear();
        await firebaseSignOut(firebaseAuth);
        callback(null);
      }
    });
  }
}
