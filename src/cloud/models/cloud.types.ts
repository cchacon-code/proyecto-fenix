import type { AppRole } from '../../auth/auth.types';

export interface CloudOrganization {
  id: string;
  name: string;
  rut: string;
  country: string;
  region: string;
  commune: string;
  active: boolean;
  creatorUid: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CloudUserProfile {
  uid: string;
  email: string;
  displayName: string;
  organizationId: string;
  role: AppRole;
  active: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}
