export type PersonType =
  | 'teacher'
  | 'coordinator'
  | 'director'
  | 'student'
  | 'guardian'
  | 'staff';

export interface Person {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  email?: string;
  type: PersonType;
  active: boolean;
}

export function getPersonFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`.trim();
}

export const personTypeLabels: Record<PersonType, string> = {
  teacher: 'Docente',
  coordinator: 'Coordinación',
  director: 'Dirección',
  student: 'Estudiante',
  guardian: 'Apoderado',
  staff: 'Funcionario',
};
