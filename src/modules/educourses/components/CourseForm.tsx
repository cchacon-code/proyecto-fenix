import { useEffect, useState } from 'react';

import { peopleService } from '../../edupeople';
import type { Course, EducationLevel } from '../index';

interface CourseFormProps {
  courseToEdit: Course | null;
  onSave: (course: Course) => void;
  onCancel: () => void;
}

const levels: EducationLevel[] = [
  'Prekínder',
  'Kínder',
  '1° Básico',
  '2° Básico',
  '3° Básico',
  '4° Básico',
  '5° Básico',
  '6° Básico',
  '7° Básico',
  '8° Básico',
  '1° Medio',
  '2° Medio',
  '3° Medio',
  '4° Medio',
];

export function CourseForm({
  courseToEdit,
  onSave,
  onCancel,
}: CourseFormProps) {
  const teachers = peopleService
    .getAll()
    .filter((person) =>
      ['teacher', 'coordinator', 'director'].includes(person.type),
    );

  const [level, setLevel] =
    useState<EducationLevel>('1° Básico');

  const [letter, setLetter] = useState('A');
  const [academicYear, setAcademicYear] = useState(2026);
  const [studentCount, setStudentCount] = useState(0);
  const [headTeacherId, setHeadTeacherId] = useState('');

  useEffect(() => {
    if (!courseToEdit) {
      return;
    }

    setLevel(courseToEdit.level);
    setLetter(courseToEdit.letter);
    setAcademicYear(courseToEdit.academicYear);
    setStudentCount(courseToEdit.studentCount);
    setHeadTeacherId(courseToEdit.headTeacherId ?? '');
  }, [courseToEdit]);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    onSave({
      id: courseToEdit?.id ?? crypto.randomUUID(),
      organizationId: 'org-educenter',
      academicYear,
      level,
      letter: letter.trim().toUpperCase(),
      headTeacherId: headTeacherId || undefined,
      studentCount,
      active: true,
    });
  }

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nivel
          <select
            value={level}
            onChange={(event) =>
              setLevel(
                event.target.value as EducationLevel,
              )
            }
          >
            {levels.map((currentLevel) => (
              <option key={currentLevel} value={currentLevel}>
                {currentLevel}
              </option>
            ))}
          </select>
        </label>

        <label>
          Letra
          <input
            required
            maxLength={2}
            value={letter}
            onChange={(event) =>
              setLetter(event.target.value)
            }
          />
        </label>

        <label>
          Año académico
          <input
            type="number"
            min={2020}
            max={2100}
            value={academicYear}
            onChange={(event) =>
              setAcademicYear(
                Number(event.target.value),
              )
            }
          />
        </label>

        <label>
          Cantidad de estudiantes
          <input
            type="number"
            min={0}
            value={studentCount}
            onChange={(event) =>
              setStudentCount(
                Number(event.target.value),
              )
            }
          />
        </label>

        <label>
          Profesor(a) jefe
          <select
            value={headTeacherId}
            onChange={(event) =>
              setHeadTeacherId(event.target.value)
            }
          >
            <option value="">Sin asignar</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">
          {courseToEdit
            ? 'Guardar cambios'
            : 'Crear curso'}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}