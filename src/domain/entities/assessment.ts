import type { BaseEntity } from './base';

export interface Assessment extends BaseEntity {
  courseId: string;
  subjectId: string;
  teacherId: string;
  title: string;
  type: 'diagnostic' | 'formative' | 'summative';
  date?: string;
  weight?: number;
  learningObjectiveIds: string[];
  status: 'draft' | 'published' | 'closed';
}

export interface AttendanceRecord extends BaseEntity {
  courseId: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'justified';
  note?: string;
}
