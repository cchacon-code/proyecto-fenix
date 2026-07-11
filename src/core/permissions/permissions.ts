export class PermissionService {
  has(
    userPermissions: string[],
    permission: string,
  ): boolean {
    return userPermissions.includes(permission);
  }

  hasAny(
    userPermissions: string[],
    permissions: string[],
  ): boolean {
    return permissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }

  hasAll(
    userPermissions: string[],
    permissions: string[],
  ): boolean {
    return permissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}