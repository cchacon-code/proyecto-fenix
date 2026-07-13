import { useEffect, useState } from 'react';

import type { Subject } from '../index';

interface SubjectFormProps {
  organizationId: string;
  subjectToEdit: Subject | null;
  onSave: (subject: Subject) => Promise<void>;
  onCancel: () => void;
}

export function SubjectForm({
  organizationId,
  subjectToEdit,
  onSave,
  onCancel,
}: SubjectFormProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState('#2563eb');
  const [weeklyHours, setWeeklyHours] = useState(2);
  const [active, setActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!subjectToEdit) {
      setName('');
      setCode('');
      setColor('#2563eb');
      setWeeklyHours(2);
      setActive(true);
      return;
    }

    setName(subjectToEdit.name);
    setCode(subjectToEdit.code);
    setColor(subjectToEdit.color);
    setWeeklyHours(subjectToEdit.weeklyHours);
    setActive(subjectToEdit.active);
  }, [subjectToEdit]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSave({
        id: subjectToEdit?.id ?? crypto.randomUUID(),
        organizationId,
        name: name.trim(),
        code: code.trim().toUpperCase(),
        color,
        weeklyHours,
        active,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nombre de la asignatura
          <input
            required
            value={name}
            placeholder="Ej. Matemática"
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Código
          <input
            required
            maxLength={12}
            value={code}
            placeholder="Ej. MAT"
            onChange={(event) => setCode(event.target.value)}
          />
        </label>

        <label>
          Horas semanales
          <input
            type="number"
            min={0}
            max={30}
            value={weeklyHours}
            onChange={(event) =>
              setWeeklyHours(Number(event.target.value))
            }
          />
        </label>

        <label>
          Color identificador
          <span className="subject-color-field">
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
            <span>{color.toUpperCase()}</span>
          </span>
        </label>

        <label className="subject-checkbox-label">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />
          Asignatura activa
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSaving}>
          {isSaving
            ? 'Guardando...'
            : subjectToEdit
              ? 'Guardar cambios'
              : 'Crear asignatura'}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
