import type { BaseEntity } from './base';

export interface AcademicYear extends BaseEntity {
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'closed';
}

export interface Campus extends BaseEntity {
  name: string;
  code?: string;
  address?: string;
  commune?: string;
  region?: string;
}

export interface Subject extends BaseEntity {
  name: string;
  code: string;
  color?: string;
  curriculumArea?: string;
}

export interface Enrollment extends BaseEntity {
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'active' | 'withdrawn' | 'completed';
}

export interface CourseAssignment extends BaseEntity {
  courseId: string;
  subjectId: string;
  teacherId: string;
  weeklyHours?: number;
}
