import { useState } from 'react';

import { peopleService } from '../../edupeople';
import { useFeedback } from '../../../shared/feedback';
import { courseService, getCourseName } from '../index';
import type { Course } from '../index';
import { CourseForm } from './CourseForm';

export function CoursesPanel() {
  const [courses, setCourses] = useState(courseService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const { notify, confirm } = useFeedback();

  function refresh(): void { setCourses(courseService.getAll()); }

  function handleSave(course: Course): void {
    try {
      if (courseToEdit) {
        courseService.update(course);
        notify('success', 'Curso actualizado', `${getCourseName(course)} fue actualizado correctamente.`);
      } else {
        courseService.add(course);
        notify('success', 'Curso creado', `${getCourseName(course)} fue agregado correctamente.`);
      }
      refresh();
      setCourseToEdit(null);
      setShowForm(false);
    } catch (error) {
      notify('error', 'No fue posible guardar el curso', error instanceof Error ? error.message : 'Ocurrió un error desconocido.');
    }
  }

  function handleEdit(course: Course): void {
    setCourseToEdit(course);
    setShowForm(true);
  }

  async function handleRemove(course: Course): Promise<void> {
    const accepted = await confirm({
      title: 'Eliminar curso',
      message: `¿Deseas eliminar ${getCourseName(course)}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Conservar',
      tone: 'danger',
    });
    if (!accepted) return;
    courseService.remove(course.id);
    refresh();
    notify('success', 'Curso eliminado', `${getCourseName(course)} fue eliminado.`);
  }

  function getTeacherName(teacherId?: string): string {
    if (!teacherId) return 'Sin asignar';
    const teacher = peopleService.getById(teacherId);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Docente no encontrado';
  }

  return (
    <section className="courses-panel">
      <div className="section-heading">
        <div><span className="eyebrow">EduCourses</span><h2>Cursos del establecimiento</h2></div>
        <button type="button" onClick={() => { setCourseToEdit(null); setShowForm(true); }}>+ Nuevo curso</button>
      </div>

      {showForm && (
        <CourseForm
          courseToEdit={courseToEdit}
          onSave={handleSave}
          onCancel={() => { setCourseToEdit(null); setShowForm(false); }}
        />
      )}

      <div className="courses-list">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <div>
              <strong>{getCourseName(course)}</strong>
              <p>Año {course.academicYear}</p>
              <p>Profesor jefe: {getTeacherName(course.headTeacherId)}</p>
              <p>{course.studentCount} estudiantes</p>
            </div>
            <div className="person-actions">
              <button type="button" className="secondary-button" onClick={() => handleEdit(course)}>Editar</button>
              <button type="button" className="danger-button" onClick={() => handleRemove(course)}>Eliminar</button>
            </div>
          </article>
        ))}
        {courses.length === 0 && <p>No existen cursos registrados.</p>}
      </div>
    </section>
  );
}
