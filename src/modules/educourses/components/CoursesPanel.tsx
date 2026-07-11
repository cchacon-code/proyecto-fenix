import { useState } from 'react';

import { peopleService } from '../../edupeople';
import {
  courseService,
  getCourseName,
} from '../index';

import type { Course } from '../index';
import { CourseForm } from './CourseForm';

export function CoursesPanel() {
  const [courses, setCourses] = useState(courseService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [courseToEdit, setCourseToEdit] =
    useState<Course | null>(null);

  function refresh(): void {
    setCourses(courseService.getAll());
  }

  function handleSave(course: Course): void {
    if (courseToEdit) {
      courseService.update(course);
    } else {
      courseService.add(course);
    }

    refresh();
    setCourseToEdit(null);
    setShowForm(false);
  }

  function handleEdit(course: Course): void {
    setCourseToEdit(course);
    setShowForm(true);
  }

  function handleRemove(courseId: string): void {
    const confirmed = window.confirm('¿Eliminar este curso?');

    if (!confirmed) {
      return;
    }

    courseService.remove(courseId);
    refresh();
  }

  function getTeacherName(teacherId?: string): string {
    if (!teacherId) {
      return 'Sin asignar';
    }

    const teacher = peopleService.getById(teacherId);

    return teacher
      ? `${teacher.firstName} ${teacher.lastName}`
      : 'Docente no encontrado';
  }

  return (
    <section className="courses-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EduCourses</span>
          <h2>Cursos del establecimiento</h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setCourseToEdit(null);
            setShowForm(true);
          }}
        >
          + Nuevo curso
        </button>
      </div>

      {showForm && (
        <CourseForm
          courseToEdit={courseToEdit}
          onSave={handleSave}
          onCancel={() => {
            setCourseToEdit(null);
            setShowForm(false);
          }}
        />
      )}

      <div className="courses-list">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <div>
              <strong>{getCourseName(course)}</strong>
              <p>Año {course.academicYear}</p>
              <p>
                Profesor jefe: {getTeacherName(course.headTeacherId)}
              </p>
              <p>{course.studentCount} estudiantes</p>
            </div>

            <div className="person-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => handleEdit(course)}
              >
                Editar
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={() => handleRemove(course.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}

        {courses.length === 0 && (
          <p>No existen cursos registrados.</p>
        )}
      </div>
    </section>
  );
}