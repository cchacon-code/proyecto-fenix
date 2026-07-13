import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../../../auth/AuthProvider';
import {
  coursesFirestoreRepository,
  peopleFirestoreRepository,
} from '../../../cloud/firestore';
import { useFeedback } from '../../../shared/feedback';
import type { Person } from '../../edupeople';
import { courseService, getCourseName } from '../index';
import type { Course } from '../index';
import { CourseForm } from './CourseForm';

export function CoursesPanel() {
  const { user } = useAuth();
  const organizationId = user?.organization.id ?? '';

  const [courses, setCourses] = useState<Course[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const { notify, confirm } = useFeedback();

  useEffect(() => {
    if (!organizationId) {
      setCourses([]);
      setPeople([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError('');

    const unsubscribeCourses = coursesFirestoreRepository.subscribe(
      organizationId,
      (nextCourses) => {
        setCourses(nextCourses);
        courseService.replaceAll(nextCourses);
        setIsLoading(false);
      },
      (error) => {
        console.error('No fue posible cargar EduCourses.', error);
        setLoadError(
          'No fue posible sincronizar los cursos con Firestore.',
        );
        setIsLoading(false);
      },
    );

    const unsubscribePeople = peopleFirestoreRepository.subscribe(
      organizationId,
      setPeople,
      (error) => {
        console.error('No fue posible cargar los docentes.', error);
      },
    );

    return () => {
      unsubscribeCourses();
      unsubscribePeople();
    };
  }, [organizationId]);

  const teachers = useMemo(
    () =>
      people.filter(
        (person) =>
          person.active &&
          ['teacher', 'coordinator', 'director'].includes(person.type),
      ),
    [people],
  );

  async function handleSave(course: Course): Promise<void> {
    try {
      await coursesFirestoreRepository.save(course);

      notify(
        'success',
        courseToEdit ? 'Curso actualizado' : 'Curso creado',
        `${getCourseName(course)} se guardó en la nube.`,
      );

      setCourseToEdit(null);
      setShowForm(false);
    } catch (error) {
      notify(
        'error',
        'No fue posible guardar el curso',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido.',
      );

      throw error;
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

    if (!accepted) {
      return;
    }

    try {
      await coursesFirestoreRepository.remove(
        organizationId,
        course.id,
      );

      notify(
        'success',
        'Curso eliminado',
        `${getCourseName(course)} fue eliminado de Firestore.`,
      );
    } catch (error) {
      notify(
        'error',
        'No fue posible eliminar el curso',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido.',
      );
    }
  }

  function getTeacherName(teacherId?: string): string {
    if (!teacherId) {
      return 'Sin asignar';
    }

    const teacher = people.find((person) => person.id === teacherId);

    return teacher
      ? `${teacher.firstName} ${teacher.lastName}`
      : 'Docente no encontrado';
  }

  return (
    <section className="courses-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EduCourses Cloud</span>
          <h2>Cursos del establecimiento</h2>
          <small className="cloud-sync-label">
            {isLoading
              ? 'Sincronizando con Firestore...'
              : loadError
                ? 'Sin conexión'
                : '● Sincronización en tiempo real activa'}
          </small>
        </div>

        <button
          type="button"
          disabled={!organizationId || isLoading}
          onClick={() => {
            setCourseToEdit(null);
            setShowForm(true);
          }}
        >
          + Nuevo curso
        </button>
      </div>

      {showForm && organizationId && (
        <CourseForm
          organizationId={organizationId}
          teachers={teachers}
          courseToEdit={courseToEdit}
          onSave={handleSave}
          onCancel={() => {
            setCourseToEdit(null);
            setShowForm(false);
          }}
        />
      )}

      {loadError && (
        <div className="cloud-error-message" role="alert">
          {loadError} Revisa las reglas de Firestore y tu conexión.
        </div>
      )}

      <div className="courses-list">
        {isLoading && <p>Cargando cursos...</p>}

        {!isLoading &&
          courses.map((course) => (
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
                  onClick={() => handleRemove(course)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}

        {!isLoading && courses.length === 0 && !loadError && (
          <p>No existen cursos registrados en Firestore.</p>
        )}
      </div>
    </section>
  );
}
