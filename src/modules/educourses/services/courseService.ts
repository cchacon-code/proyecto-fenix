import type { Course } from '../domain/course';
import { storage } from '../../../shared/storage';

const STORAGE_KEY = 'fenix.educourses';

export class CourseService {
  private courses: Course[] = storage.get<Course[]>(STORAGE_KEY) ?? [];

  getAll(): Course[] {
    return [...this.courses];
  }

  add(course: Course): void {
    const alreadyExists = this.courses.some(
      (currentCourse) => currentCourse.id === course.id,
    );

    if (alreadyExists) {
      throw new Error(`El curso ${course.id} ya existe.`);
    }

    this.courses = [...this.courses, course];
    this.persist();
  }

  update(course: Course): void {
    this.courses = this.courses.map((currentCourse) =>
      currentCourse.id === course.id ? course : currentCourse,
    );

    this.persist();
  }

  remove(courseId: string): void {
    this.courses = this.courses.filter(
      (course) => course.id !== courseId,
    );

    this.persist();
  }

  count(): number {
    return this.courses.length;
  }

  private persist(): void {
    storage.set(STORAGE_KEY, this.courses);
  }
}
