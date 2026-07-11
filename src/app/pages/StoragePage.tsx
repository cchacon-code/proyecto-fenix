import { useState } from 'react';

import { organizationProfileService } from '../../modules/eduorganization';
import { courseService } from '../../modules/educourses';
import { peopleService } from '../../modules/edupeople';
import { Badge, Button, Card, PageHeader } from '../../shared/ui';

export function StoragePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const peopleCount = peopleService.getAll().length;
  const courseCount = courseService.getAll().length;
  const hasOrganization = organizationProfileService.exists();

  function refresh(): void {
    setRefreshKey((current) => current + 1);
  }

  return (
    <div className="page-stack" data-refresh={refreshKey}>
      <PageHeader
        eyebrow="ARQ003"
        title="Capa de datos"
        description="Diagnóstico de persistencia y preparación para Firebase."
        actions={<Button onClick={refresh}>Actualizar estado</Button>}
      />

      <div className="data-grid">
        <Card title="EduPeople" subtitle="Registros persistidos">
          <div className="data-stat">
            <strong>{peopleCount}</strong>
            <Badge variant={peopleCount > 0 ? 'success' : 'neutral'}>
              {peopleCount > 0 ? 'Con datos' : 'Vacío'}
            </Badge>
          </div>
        </Card>

        <Card title="EduCourses" subtitle="Cursos persistidos">
          <div className="data-stat">
            <strong>{courseCount}</strong>
            <Badge variant={courseCount > 0 ? 'success' : 'neutral'}>
              {courseCount > 0 ? 'Con datos' : 'Vacío'}
            </Badge>
          </div>
        </Card>

        <Card title="EduOrganization" subtitle="Perfil institucional">
          <div className="data-stat">
            <strong>{hasOrganization ? '1' : '0'}</strong>
            <Badge variant={hasOrganization ? 'success' : 'warning'}>
              {hasOrganization ? 'Configurado' : 'Pendiente'}
            </Badge>
          </div>
        </Card>

        <Card title="Proveedor activo" subtitle="Implementación actual">
          <div className="data-provider">
            <Badge variant="info">LocalStorageAdapter</Badge>
            <p>
              Los módulos ya consumen una interfaz común. Firebase podrá
              reemplazar este adaptador sin modificar la lógica funcional.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
