import type { BaseEntity } from './base';

export interface PlanningUnit extends BaseEntity {
  courseId: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  learningObjectiveIds: string[];
  status: 'draft' | 'submitted' | 'approved' | 'changes_requested';
}

export interface LessonPlan extends BaseEntity {
  unitId: string;
  courseId: string;
  subjectId: string;
  teacherId: string;
  lessonNumber: number;
  date?: string;
  objective: string;
  opening: string;
  development: string;
  closing: string;
  resources: string[];
  assessmentEvidence?: string;
  status: 'draft' | 'submitted' | 'approved' | 'changes_requested';
  version: number;
}
