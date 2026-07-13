export interface Subject {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  color: string;
  weeklyHours: number;
  active: boolean;
}

export function getSubjectLabel(subject: Subject): string {
  return subject.code
    ? `${subject.name} (${subject.code})`
    : subject.name;
}
