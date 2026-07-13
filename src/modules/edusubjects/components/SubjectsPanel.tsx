import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../../../auth/AuthProvider';
import { subjectsFirestoreRepository } from '../../../cloud/firestore';
import { useFeedback } from '../../../shared/feedback';
import { getSubjectLabel } from '../index';
import type { Subject } from '../index';
import { SubjectForm } from './SubjectForm';

export function SubjectsPanel() {
  const { user } = useAuth();
  const organizationId = user?.organization.id ?? '';

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [subjectToEdit, setSubjectToEdit] =
    useState<Subject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const { notify, confirm } = useFeedback();

  useEffect(() => {
    if (!organizationId) {
      setSubjects([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError('');

    return subjectsFirestoreRepository.subscribe(
      organizationId,
      (nextSubjects) => {
        setSubjects(nextSubjects);
        setIsLoading(false);
      },
      (error) => {
        console.error('No fue posible cargar EduSubjects.', error);
        setLoadError(
          'No fue posible sincronizar las asignaturas con Firestore.',
        );
        setIsLoading(false);
      },
    );
  }, [organizationId]);

  const filteredSubjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return subjects;
    }

    return subjects.filter((subject) =>
      `${subject.name} ${subject.code}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query, subjects]);

  async function handleSave(subject: Subject): Promise<void> {
    try {
      await subjectsFirestoreRepository.save(subject);

      notify(
        'success',
        subjectToEdit
          ? 'Asignatura actualizada'
          : 'Asignatura creada',
        `${getSubjectLabel(subject)} se guardó en la nube.`,
      );

      setSubjectToEdit(null);
      setShowForm(false);
    } catch (error) {
      notify(
        'error',
        'No fue posible guardar la asignatura',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido.',
      );

      throw error;
    }
  }

  async function handleRemove(subject: Subject): Promise<void> {
    const accepted = await confirm({
      title: 'Eliminar asignatura',
      message: `¿Deseas eliminar ${getSubjectLabel(subject)}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Conservar',
      tone: 'danger',
    });

    if (!accepted) {
      return;
    }

    try {
      await subjectsFirestoreRepository.remove(
        organizationId,
        subject.id,
      );

      notify(
        'success',
        'Asignatura eliminada',
        `${getSubjectLabel(subject)} fue eliminada de Firestore.`,
      );
    } catch (error) {
      notify(
        'error',
        'No fue posible eliminar la asignatura',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido.',
      );
    }
  }

  return (
    <section className="subjects-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EduSubjects Cloud</span>
          <h2>Asignaturas del establecimiento</h2>
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
            setSubjectToEdit(null);
            setShowForm(true);
          }}
        >
          + Nueva asignatura
        </button>
      </div>

      <div className="subjects-toolbar">
        <input
          type="search"
          placeholder="Buscar por nombre o código"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span>{filteredSubjects.length} asignaturas</span>
      </div>

      {showForm && organizationId && (
        <SubjectForm
          organizationId={organizationId}
          subjectToEdit={subjectToEdit}
          onSave={handleSave}
          onCancel={() => {
            setSubjectToEdit(null);
            setShowForm(false);
          }}
        />
      )}

      {loadError && (
        <div className="cloud-error-message" role="alert">
          {loadError} Revisa las reglas de Firestore y tu conexión.
        </div>
      )}

      <div className="subjects-list">
        {isLoading && <p>Cargando asignaturas...</p>}

        {!isLoading &&
          filteredSubjects.map((subject) => (
            <article className="subject-card" key={subject.id}>
              <div
                className="subject-color"
                style={{ backgroundColor: subject.color }}
                aria-hidden="true"
              />

              <div className="subject-details">
                <strong>{subject.name}</strong>
                <p>Código: {subject.code}</p>
                <p>{subject.weeklyHours} horas semanales</p>
                <small>
                  {subject.active ? 'Activa' : 'Inactiva'}
                </small>
              </div>

              <div className="person-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setSubjectToEdit(subject);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleRemove(subject)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}

        {!isLoading &&
          filteredSubjects.length === 0 &&
          !loadError && (
            <p>No existen asignaturas que coincidan con la búsqueda.</p>
          )}
      </div>
    </section>
  );
}
