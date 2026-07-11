import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  PageHeader,
  Select,
} from '../../shared/ui';

export function DesignSystemPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('teacher');

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="ARQ002"
        title="Design System"
        description="Componentes visuales reutilizables de EduSuite AI."
      />

      <div className="design-grid">
        <Card
          title="Botones"
          subtitle="Variantes oficiales de acción."
        >
          <div className="component-row">
            <Button>Guardar</Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="danger">Eliminar</Button>
            <Button variant="ghost">Ver detalles</Button>
          </div>
        </Card>

        <Card
          title="Campos"
          subtitle="Entradas consistentes y accesibles."
        >
          <div className="design-form-grid">
            <Input
              label="Nombre"
              value={name}
              placeholder="Ej. Carlos Chacón"
              onChange={(event) => setName(event.target.value)}
            />

            <Select
              label="Rol"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              options={[
                { value: 'teacher', label: 'Docente' },
                { value: 'coordinator', label: 'Coordinación' },
                { value: 'director', label: 'Dirección' },
              ]}
            />
          </div>
        </Card>

        <Card
          title="Estados"
          subtitle="Indicadores breves para información importante."
        >
          <div className="component-row">
            <Badge variant="success">Activo</Badge>
            <Badge variant="warning">Pendiente</Badge>
            <Badge variant="danger">Incidencia</Badge>
            <Badge variant="info">Información</Badge>
            <Badge>Neutral</Badge>
          </div>
        </Card>

        <Card title="Estado vacío">
          <EmptyState
            icon="📚"
            title="Sin registros"
            description="Aún no existen elementos en este módulo."
            action={<Button>Crear primer registro</Button>}
          />
        </Card>
      </div>
    </div>
  );
}
