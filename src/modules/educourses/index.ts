import { CourseService } from './services/courseService';

export const courseService = new CourseService();

export type {
  Course,
  EducationLevel,
} from './domain/course';

export {
  getCourseName,
} from './domain/course';