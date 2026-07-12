import { useMemo, useState } from 'react';

import { useFeedback } from '../../../shared/feedback';
import { getPersonFullName, peopleService, personTypeLabels } from '../index';
import type { Person, PersonType } from '../index';
import { PersonForm } from './PersonForm';

const initialPeople: Person[] = [
  { id: 'person-carlos-001', organizationId: 'org-educenter', firstName: 'Carlos', lastName: 'Chacón', email: 'cchacon@colegioeducenter.cl', type: 'director', active: true },
  { id: 'person-rosario-001', organizationId: 'org-educenter', firstName: 'Rosario', lastName: 'Gallardo', type: 'coordinator', active: true },
];

peopleService.seed(initialPeople);

export function PeoplePanel() {
  const [people, setPeople] = useState(peopleService.getAll());
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PersonType | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<Person | null>(null);
  const { notify, confirm } = useFeedback();

  const filteredPeople = useMemo(() => peopleService.search(query, typeFilter), [people, query, typeFilter]);

  function refresh(): void { setPeople(peopleService.getAll()); }

  function handleSave(person: Person): void {
    try {
      if (personToEdit) {
        peopleService.update(person);
        notify('success', 'Persona actualizada', `${getPersonFullName(person)} fue actualizada correctamente.`);
      } else {
        peopleService.add(person);
        notify('success', 'Persona agregada', `${getPersonFullName(person)} fue incorporada al directorio.`);
      }
      refresh();
      setPersonToEdit(null);
      setShowForm(false);
    } catch (error) {
      notify('error', 'No fue posible guardar la persona', error instanceof Error ? error.message : 'Ocurrió un error desconocido.');
    }
  }

  function handleEdit(person: Person): void { setPersonToEdit(person); setShowForm(true); }

  async function handleRemove(person: Person): Promise<void> {
    const accepted = await confirm({
      title: 'Eliminar persona',
      message: `¿Deseas eliminar a ${getPersonFullName(person)}?`,
      confirmText: 'Eliminar',
      cancelText: 'Conservar',
      tone: 'danger',
    });
    if (!accepted) return;
    peopleService.remove(person.id);
    refresh();
    notify('success', 'Persona eliminada', `${getPersonFullName(person)} fue eliminada del directorio.`);
  }

  function closeForm(): void { setPersonToEdit(null); setShowForm(false); }

  return (
    <section className="people-panel">
      <div className="section-heading">
        <div><span className="eyebrow">EduPeople</span><h2>Directorio institucional</h2></div>
        <button type="button" onClick={() => { setPersonToEdit(null); setShowForm(true); }}>+ Nueva persona</button>
      </div>

      <div className="people-toolbar">
        <input type="search" placeholder="Buscar por nombre o correo" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as PersonType | 'all')}>
          <option value="all">Todos los tipos</option>
          <option value="teacher">Docentes</option>
          <option value="coordinator">Coordinación</option>
          <option value="director">Dirección</option>
          <option value="student">Estudiantes</option>
          <option value="guardian">Apoderados</option>
          <option value="staff">Funcionarios</option>
        </select>
      </div>

      {showForm && <PersonForm organizationId="org-educenter" personToEdit={personToEdit} onSave={handleSave} onCancel={closeForm} />}

      <div className="people-summary">{filteredPeople.length} de {people.length} personas</div>

      <div className="people-list">
        {filteredPeople.map((person) => (
          <article className="person-card" key={person.id}>
            <div className="person-avatar">{person.firstName.charAt(0)}{person.lastName.charAt(0)}</div>
            <div className="person-details">
              <strong>{getPersonFullName(person)}</strong>
              <p>{personTypeLabels[person.type]}</p>
              {person.email && <small>{person.email}</small>}
            </div>
            <div className="person-actions">
              <button type="button" className="secondary-button" onClick={() => handleEdit(person)}>Editar</button>
              <button type="button" className="danger-button" onClick={() => handleRemove(person)}>Eliminar</button>
            </div>
          </article>
        ))}
        {filteredPeople.length === 0 && <p>No se encontraron personas.</p>}
      </div>
    </section>
  );
}
