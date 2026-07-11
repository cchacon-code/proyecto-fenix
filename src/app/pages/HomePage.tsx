import { Link } from 'react-router-dom';

import { courseService } from '../../modules/educourses';
import { organizationProfileService } from '../../modules/eduorganization';
import { peopleService } from '../../modules/edupeople';
import { Badge, Button, Card } from '../../shared/ui';

const quickActions = [
  {
    title: 'Agregar persona',
    description: 'Registra docentes, estudiantes o funcionarios.',
    to: '/personas',
    icon: '👤',
  },
  {
    title: 'Crear curso',
    description: 'Configura un curso y asigna profesor jefe.',
    to: '/cursos',
    icon: '🎓',
  },
  {
    title: 'Completar institución',
    description: 'Actualiza los datos oficiales del establecimiento.',
    to: '/organizacion',
    icon: '🏫',
  },
];

export function HomePage() {
  const people = peopleService.getAll();
  const courses = courseService.getAll();
  const organization = organizationProfileService.load();
  const students = people.filter((person) => person.type === 'student').length;
  const teachers = people.filter((person) =>
    ['teacher', 'coordinator', 'director'].includes(person.type),
  ).length;

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Buenos días' : now.getHours() < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="dashboard-page">
      <section className="welcome-panel">
        <div>
          <span className="eyebrow">Centro de comando</span>
          <h2>{greeting}, Carlos 👋</h2>
          <p>
            Este es el estado actual de {organization?.name ?? 'tu institución'}.
          </p>
        </div>

        <Badge variant="success">Sistema operativo</Badge>
      </section>

      <section className="stats-grid" aria-label="Indicadores generales">
        <Card className="stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <span>Personas registradas</span>
            <strong>{people.length}</strong>
            <small>{teachers} integrantes del equipo educativo</small>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">🎓</div>
          <div>
            <span>Cursos activos</span>
            <strong>{courses.length}</strong>
            <small>{courses.reduce((total, course) => total + course.studentCount, 0)} estudiantes declarados</small>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">🧑‍🎓</div>
          <div>
            <span>Estudiantes individuales</span>
            <strong>{students}</strong>
            <small>Registrados en EduPeople</small>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">🏫</div>
          <div>
            <span>Perfil institucional</span>
            <strong>{organization ? 'Listo' : 'Pendiente'}</strong>
            <small>{organization?.commune ?? 'Completa la configuración inicial'}</small>
          </div>
        </Card>
      </section>

      <section className="dashboard-grid">
        <Card
          title="¿Qué quieres hacer hoy?"
          subtitle="Acciones frecuentes para avanzar más rápido."
        >
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <Link className="quick-action" key={action.to} to={action.to}>
                <span className="quick-action-icon">{action.icon}</span>
                <div>
                  <strong>{action.title}</strong>
                  <p>{action.description}</p>
                </div>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card
          title="Estado de la plataforma"
          subtitle="Capacidades disponibles en esta release."
        >
          <div className="system-status-list">
            <div><span>EduCore</span><Badge variant="success">Activo</Badge></div>
            <div><span>EduPeople</span><Badge variant="success">Activo</Badge></div>
            <div><span>EduCourses</span><Badge variant="success">Activo</Badge></div>
            <div><span>EduOrganization</span><Badge variant={organization ? 'success' : 'warning'}>{organization ? 'Configurado' : 'Pendiente'}</Badge></div>
            <div><span>Proveedor de datos</span><Badge variant="info">LocalStorage</Badge></div>
          </div>
        </Card>
      </section>

      <Card
        title="Próximas capacidades"
        subtitle="Hoja de ruta inmediata de EduSuite AI."
        actions={<Button variant="ghost">Ver roadmap</Button>}
      >
        <div className="roadmap-strip">
          <div><span>01</span><strong>EduSubjects</strong><small>Asignaturas y docentes</small></div>
          <div><span>02</span><strong>EduPlanning</strong><small>Planificación pedagógica</small></div>
          <div><span>03</span><strong>EduAssess</strong><small>Evaluaciones y rúbricas</small></div>
          <div><span>04</span><strong>EduAI</strong><small>Copiloto institucional</small></div>
        </div>
      </Card>
    </div>
  );
}
