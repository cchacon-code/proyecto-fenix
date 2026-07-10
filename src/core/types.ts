export type Role='superadmin'|'admin'|'directivo'|'coordinacion'|'uaa'|'multicopia'|'docente';
export interface IdentityContext{userId:string;organizationId:string;displayName:string;role:Role;permissions:string[]}
