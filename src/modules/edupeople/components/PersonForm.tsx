import { useEffect, useState } from 'react';

import type { Person, PersonType } from '../index';

interface PersonFormProps {
  organizationId: string;
  personToEdit: Person | null;
  onSave: (person: Person) => Promise<void>;
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
  const [isSaving, setIsSaving] = useState(false);

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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setIsSaving(true);

    const person: Person = {
      id: personToEdit?.id ?? crypto.randomUUID(),
      organizationId,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim() || undefined,
      type: form.type,
      active: true,
    };

    try {
      await onSave(person);
      setForm(emptyForm);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nombre
          <input
            required
            disabled={isSaving}
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
            disabled={isSaving}
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
            disabled={isSaving}
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </label>

        <label>
          Tipo
          <select
            disabled={isSaving}
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
        <button type="submit" disabled={isSaving}>
          {isSaving
            ? 'Guardando...'
            : personToEdit
              ? 'Guardar cambios'
              : 'Agregar persona'}
        </button>

        <button
          type="button"
          className="secondary-button"
          disabled={isSaving}
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
