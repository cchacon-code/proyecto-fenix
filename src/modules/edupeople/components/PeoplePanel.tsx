import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../../../auth/AuthProvider';
import { peopleFirestoreRepository } from '../../../cloud/firestore';
import { useFeedback } from '../../../shared/feedback';
import {
  getPersonFullName,
  peopleService,
  personTypeLabels,
} from '../index';
import type { Person, PersonType } from '../index';
import { PersonForm } from './PersonForm';

export function PeoplePanel() {
  const { user } = useAuth();
  const organizationId = user?.organization.id ?? '';

  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] =
    useState<PersonType | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [personToEdit, setPersonToEdit] =
    useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const { notify, confirm } = useFeedback();

  useEffect(() => {
    if (!organizationId) {
      setPeople([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError('');

    return peopleFirestoreRepository.subscribe(
      organizationId,
      (nextPeople) => {
        setPeople(nextPeople);
        peopleService.replaceAll(nextPeople);
        setIsLoading(false);
      },
      (error) => {
        console.error('No fue posible cargar EduPeople.', error);
        setLoadError(
          'No fue posible sincronizar el directorio con Firestore.',
        );
        setIsLoading(false);
      },
    );
  }, [organizationId]);

  const filteredPeople = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return people.filter((person) => {
      const matchesType =
        typeFilter === 'all' || person.type === typeFilter;
      const searchable =
        `${person.firstName} ${person.lastName} ${person.email ?? ''}`.toLowerCase();

      return matchesType && searchable.includes(normalized);
    });
  }, [people, query, typeFilter]);

  async function handleSave(person: Person): Promise<void> {
    try {
      await peopleFirestoreRepository.save(person);

      notify(
        'success',
        personToEdit ? 'Persona actualizada' : 'Persona agregada',
        `${getPersonFullName(person)} se guardó en la nube.`,
      );

      setPersonToEdit(null);
      setShowForm(false);
    } catch (error) {
      notify(
        'error',
        'No fue posible guardar la persona',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido.',
      );

      throw error;
    }
  }

  function handleEdit(person: Person): void {
    setPersonToEdit(person);
    setShowForm(true);
  }

  async function handleRemove(person: Person): Promise<void> {
    const accepted = await confirm({
      title: 'Eliminar persona',
      message: `¿Deseas eliminar a ${getPersonFullName(person)}?`,
      confirmText: 'Eliminar',
      cancelText: 'Conservar',
      tone: 'danger',
    });

    if (!accepted) {
      return;
    }

    try {
      await peopleFirestoreRepository.remove(
        organizationId,
        person.id,
      );

      notify(
        'success',
        'Persona eliminada',
        `${getPersonFullName(person)} fue eliminada de Firestore.`,
      );
    } catch (error) {
      notify(
        'error',
        'No fue posible eliminar la persona',
        error instanceof Error
          ? error.message
          : 'Ocurrió un error desconocido.',
      );
    }
  }

  function closeForm(): void {
    setPersonToEdit(null);
    setShowForm(false);
  }

  return (
    <section className="people-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EduPeople Cloud</span>
          <h2>Directorio institucional</h2>
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
            setPersonToEdit(null);
            setShowForm(true);
          }}
        >
          + Nueva persona
        </button>
      </div>

      <div className="people-toolbar">
        <input
          type="search"
          placeholder="Buscar por nombre o correo"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(
              event.target.value as PersonType | 'all',
            )
          }
        >
          <option value="all">Todos los tipos</option>
          <option value="teacher">Docentes</option>
          <option value="coordinator">Coordinación</option>
          <option value="director">Dirección</option>
          <option value="student">Estudiantes</option>
          <option value="guardian">Apoderados</option>
          <option value="staff">Funcionarios</option>
        </select>
      </div>

      {showForm && organizationId && (
        <PersonForm
          organizationId={organizationId}
          personToEdit={personToEdit}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {loadError && (
        <div className="cloud-error-message" role="alert">
          {loadError} Revisa las reglas de Firestore y tu conexión.
        </div>
      )}

      <div className="people-summary">
        {isLoading
          ? 'Cargando personas...'
          : `${filteredPeople.length} de ${people.length} personas`}
      </div>

      <div className="people-list">
        {!isLoading &&
          filteredPeople.map((person) => (
            <article className="person-card" key={person.id}>
              <div className="person-avatar">
                {person.firstName.charAt(0)}
                {person.lastName.charAt(0)}
              </div>

              <div className="person-details">
                <strong>{getPersonFullName(person)}</strong>
                <p>{personTypeLabels[person.type]}</p>
                {person.email && <small>{person.email}</small>}
              </div>

              <div className="person-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleEdit(person)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleRemove(person)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}

        {!isLoading && filteredPeople.length === 0 && !loadError && (
          <p>No se encontraron personas en Firestore.</p>
        )}
      </div>
    </section>
  );
}
