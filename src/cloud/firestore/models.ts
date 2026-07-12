import type { AppRole } from '../../auth/auth.types';

export interface CloudUserProfile {
  uid: string;
  email: string;
  name: string;
  organizationId: string;
  role: AppRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CloudOrganization {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
