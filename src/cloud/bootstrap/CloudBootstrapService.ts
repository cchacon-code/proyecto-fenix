import type { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import type { AppRole } from '../../auth/auth.types';
import { rolePermissions } from '../../auth/permissions';
import type { UserIdentity } from '../../core/identity/identity';
import type {
  CloudOrganization,
  CloudUserProfile,
} from '../models';
import {
  organizationCloudRepository,
  userCloudRepository,
} from '../repositories';

const DEFAULT_ORGANIZATION_ID = 'org-educenter';

function roleName(role: AppRole): string {
  const labels: Record<AppRole, string> = {
    superadmin: 'Superadministrador',
    admin: 'Administrador',
    director: 'Dirección',
    coordinator: 'Coordinación',
    uaa: 'UAA',
    multicopy: 'Multicopiado',
    teacher: 'Docente',
  };

  return labels[role];
}

function inferredName(user: User): string {
  const emailName = (user.email ?? '').split('@')[0];

  return (
    user.displayName?.trim() ||
    emailName
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) ||
    'Usuario EduSuite'
  );
}

function isBootstrapAdministrator(user: User): boolean {
  const configuredEmail = import.meta.env.VITE_BOOTSTRAP_ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  return Boolean(
    configuredEmail &&
      user.email?.trim().toLowerCase() === configuredEmail,
  );
}

function toIdentity(
  profile: CloudUserProfile,
  organization: CloudOrganization,
): UserIdentity {
  return {
    uid: profile.uid,
    name: profile.displayName,
    email: profile.email,
    organization: {
      id: organization.id,
      name: organization.name,
    },
    role: {
      id: profile.role,
      name: roleName(profile.role),
    },
    permissions: rolePermissions[profile.role],
  };
}

export class CloudBootstrapService {
  async resolveIdentity(firebaseUser: User): Promise<UserIdentity> {
    let profile = await userCloudRepository.getByUid(firebaseUser.uid);

    if (!profile) {
      if (!isBootstrapAdministrator(firebaseUser)) {
        throw new Error(
          'Tu cuenta está autenticada, pero aún no ha sido habilitada en EduSuite AI.',
        );
      }

      await this.createInitialOrganization(firebaseUser);

      profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName: inferredName(firebaseUser),
        organizationId: DEFAULT_ORGANIZATION_ID,
        role: 'admin',
        active: true,
      };

      await userCloudRepository.create(profile);
    }

    if (!profile.active) {
      throw new Error('Tu cuenta de EduSuite AI se encuentra deshabilitada.');
    }

    const organization = await organizationCloudRepository.getById(
      profile.organizationId,
    );

    if (!organization) {
      throw new Error(
        'No se encontró la organización asociada a tu cuenta.',
      );
    }

    if (!organization.active) {
      throw new Error('La organización se encuentra deshabilitada.');
    }

    return toIdentity(profile, organization);
  }

  private async createInitialOrganization(user: User): Promise<void> {
    const organization: CloudOrganization = {
      id: DEFAULT_ORGANIZATION_ID,
      name: 'Colegio Particular Educenter',
      rut: '',
      country: 'Chile',
      region: 'Valparaíso',
      commune: 'Calle Larga',
      active: true,
      creatorUid: user.uid,
    };

    try {
      await organizationCloudRepository.create(organization);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'permission-denied'
      ) {
        throw new Error(
          'Firestore rechazó la creación inicial. Publica las reglas incluidas en firebase/firestore.rules.',
        );
      }

      throw error;
    }
  }
}

export const cloudBootstrapService = new CloudBootstrapService();
