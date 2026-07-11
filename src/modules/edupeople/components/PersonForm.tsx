import { useEffect, useState } from 'react';

import type { Person, PersonType } from '../index';

interface PersonFormProps {
  organizationId: string;
  personToEdit: Person | null;
  onSave: (person: Person) => void;
  onCancel: () => void;
}

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  type: 'teacher' as PersonType,
};

export function PersonForm({
  organizationId,
  personToEdit,
  onSave,
  onCancel,
}: PersonFormProps) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (personToEdit) {
      setForm({
        firstName: personToEdit.firstName,
        lastName: personToEdit.lastName,
        email: personToEdit.email ?? '',
        type: personToEdit.type,
      });
    } else {
      setForm(emptyForm);
    }
  }, [personToEdit]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const person: Person = {
      id: personToEdit?.id ?? crypto.randomUUID(),
      organizationId,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim() || undefined,
      type: form.type,
      active: true,
    };

    onSave(person);
    setForm(emptyForm);
  }

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nombre
          <input
            required
            value={form.firstName}
            onChange={(event) =>
              setForm({ ...form, firstName: event.target.value })
            }
          />
        </label>

        <label>
          Apellido
          <input
            required
            value={form.lastName}
            onChange={(event) =>
              setForm({ ...form, lastName: event.target.value })
            }
          />
        </label>

        <label>
          Correo
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </label>

        <label>
          Tipo
          <select
            value={form.type}
            onChange={(event) =>
              setForm({
                ...form,
                type: event.target.value as PersonType,
              })
            }
          >
            <option value="teacher">Docente</option>
            <option value="coordinator">Coordinación</option>
            <option value="director">Dirección</option>
            <option value="student">Estudiante</option>
            <option value="guardian">Apoderado</option>
            <option value="staff">Funcionario</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">
          {personToEdit ? 'Guardar cambios' : 'Agregar persona'}
        </button>

        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
