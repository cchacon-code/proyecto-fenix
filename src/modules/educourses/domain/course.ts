export type EducationLevel =
  | 'Prekínder'
  | 'Kínder'
  | '1° Básico'
  | '2° Básico'
  | '3° Básico'
  | '4° Básico'
  | '5° Básico'
  | '6° Básico'
  | '7° Básico'
  | '8° Básico'
  | '1° Medio'
  | '2° Medio'
  | '3° Medio'
  | '4° Medio';

export interface Course {
  id: string;
  organizationId: string;
  academicYear: number;
  level: EducationLevel;
  letter: string;
  headTeacherId?: string;
  studentCount: number;
  active: boolean;
}

export function getCourseName(course: Course): string {
  return `${course.level} ${course.letter}`.trim();
}