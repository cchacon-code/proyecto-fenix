import type { Course } from '../domain/course';

const STORAGE_KEY = 'fenix.educourses';

export class CourseService {
  private courses: Course[] = this.load();

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

  private persist(): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.courses),
    );
  }

  private load(): Course[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as Course[];
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }
}