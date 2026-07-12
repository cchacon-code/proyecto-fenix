import type { AppRole } from './auth.types';

export const rolePermissions: Record<AppRole, string[]> = {
  superadmin: ['*'],
  admin: [
    'dashboard.view', 'people.view', 'people.manage', 'courses.view',
    'courses.manage', 'organization.view', 'organization.manage',
    'data.view', 'design.view', 'settings.view',
  ],
  director: [
    'dashboard.view', 'people.view', 'people.manage', 'courses.view',
    'courses.manage', 'organization.view', 'organization.manage', 'data.view',
  ],
  coordinator: [
    'dashboard.view', 'people.view', 'courses.view', 'courses.manage',
    'organization.view',
  ],
  uaa: ['dashboard.view', 'people.view', 'courses.view'],
  multicopy: ['dashboard.view', 'courses.view'],
  teacher: ['dashboard.view', 'people.view', 'courses.view'],
};

export function canAccess(userPermissions: string[], permission: string): boolean {
  return userPermissions.includes('*') || userPermissions.includes(permission);
}
