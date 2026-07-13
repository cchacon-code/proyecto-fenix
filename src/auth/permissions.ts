import type { AppRole } from './auth.types';

export const rolePermissions: Record<AppRole, string[]> = {
  superadmin: ['*'],
  admin: [
    'dashboard.view', 'people.view', 'people.manage', 'courses.view',
    'courses.manage', 'organization.view', 'organization.manage',
    'subjects.view', 'subjects.manage', 'data.view', 'design.view', 'settings.view',
  ],
  director: [
    'dashboard.view', 'people.view', 'people.manage', 'courses.view',
    'courses.manage', 'organization.view', 'organization.manage', 'subjects.view', 'subjects.manage', 'data.view',
  ],
  coordinator: [
    'dashboard.view', 'people.view', 'courses.view', 'courses.manage',
    'organization.view', 'subjects.view', 'subjects.manage',
  ],
  uaa: ['dashboard.view', 'people.view', 'courses.view', 'subjects.view'],
  multicopy: ['dashboard.view', 'courses.view', 'subjects.view'],
  teacher: ['dashboard.view', 'people.view', 'courses.view', 'subjects.view'],
};

export function canAccess(userPermissions: string[], permission: string): boolean {
  return userPermissions.includes('*') || userPermissions.includes(permission);
}
