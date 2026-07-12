import {
  Boxes,
  Database,
  Flag,
  GitBranch,
  History,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { appConfig, eduKernel } from '../../kernel';
import { Badge, Card, PageHeader } from '../../shared/ui';

const capabilities = [
  {
    icon: Boxes,
    title: 'Modelo de dominio',
    description: 'Entidades base para año académico, asignaturas, planificación, evaluación, asistencia y comunicaciones.',
    status: 'Listo',
  },
  {
    icon: Database,
    title: 'Contratos de repositorios',
    description: 'Interfaces estables para desacoplar los módulos de Firebase, Firestore o cualquier proveedor futuro.',
    status: 'Listo',
  },
  {
    icon: Network,
    title: 'Event Bus',
    description: 'Canal interno para que los módulos publiquen eventos sin depender directamente entre sí.',
    status: 'Listo',
  },
  {
    icon: Flag,
    title: 'Feature Flags',
    description: 'Activación gradual de módulos por release, colegio o etapa de implementación.',
    status: 'Listo',
  },
  {
    icon: History,
    title: 'Auditoría',
    description: 'Base para registrar quién realizó cada acción, cuándo y sobre qué entidad.',
    status: 'Listo',
  },
  {
    icon: ShieldCheck,
    title: 'Multiinstitución',
    description: 'Todo dato persistente deberá llevar contexto de organización, año académico y usuario.',
    status: 'Definido',
  },
];

export function FoundationPage() {
  const flags = eduKernel.features.snapshot();
  const enabled = Object.values(flags).filter(Boolean).length;

  return (
    <div className="page-stack foundation-page">
      <PageHeader
        eyebrow="Release 0.5"
        title="Foundation"
        description="Arquitectura base para Firebase, EduPlanning y el crecimiento multiinstitucional de EduSuite AI."
      />

      <section className="foundation-hero">
        <div>
          <Badge variant="info">{appConfig.productName} {appConfig.version}</Badge>
          <h2>Una base estable antes de conectar la nube</h2>
          <p>
            La plataforma ya cuenta con contratos, eventos, configuración, auditoría y un modelo de dominio común.
          </p>
        </div>
        <GitBranch size={54} aria-hidden="true" />
      </section>

      <section className="foundation-grid">
        {capabilities.map(({ icon: Icon, title, description, status }) => (
          <Card key={title} title={title} actions={<Badge variant="success">{status}</Badge>}>
            <div className="foundation-card-content">
              <span className="foundation-icon"><Icon size={22} /></span>
              <p>{description}</p>
            </div>
          </Card>
        ))}
      </section>

      <Card title="Mapa de activación" subtitle={`${enabled} módulos habilitados en esta release.`}>
        <div className="feature-flag-list">
          {Object.entries(flags).map(([name, active]) => (
            <div key={name}>
              <span>{name}</span>
              <Badge variant={active ? 'success' : 'neutral'}>
                {active ? 'Activo' : 'Próximo'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
