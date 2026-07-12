import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  GraduationCap,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { canAccess } from '../../auth/permissions';
import { courseService } from '../../modules/educourses';
import { organizationProfileService } from '../../modules/eduorganization';
import { peopleService } from '../../modules/edupeople';
import { Badge, Card } from '../../shared/ui';

export function HomePage() {
  const { user } = useAuth();
  const people = peopleService.getAll();
  const courses = courseService.getAll();
  const profile = organizationProfileService.load();
  const students = courses.reduce((total, course) => total + course.studentCount, 0);
  const configured = Boolean(profile);

  return (
    <div className="dashboard-page">
      <section className="welcome-panel">
        <div>
          <Badge variant="info">Platform 0.4</Badge>
          <h1>Buenos días, {user?.name.split(' ')[0]}.</h1>
          <p>
            Este workspace adapta la navegación y las acciones a tu rol de {user?.role.name.toLowerCase()}.
          </p>
        </div>

        <div className="welcome-orbit" aria-hidden="true">
          <Sparkles size={34} />
        </div>
      </section>

      <section className="stats-grid" aria-label="Indicadores principales">
        <article className="stat-card stat-indigo">
          <span className="stat-icon"><Users size={22} /></span>
          <div><small>Personas registradas</small><strong>{people.length}</strong></div>
          {canAccess(user?.permissions ?? [], 'people.view') && <Link to="/personas">Gestionar <ArrowRight size={15} /></Link>}
        </article>

        <article className="stat-card stat-emerald">
          <span className="stat-icon"><GraduationCap size={22} /></span>
          <div><small>Cursos activos</small><strong>{courses.length}</strong></div>
          {canAccess(user?.permissions ?? [], 'courses.view') && <Link to="/cursos">Gestionar <ArrowRight size={15} /></Link>}
        </article>

        <article className="stat-card stat-amber">
          <span className="stat-icon"><BookOpenCheck size={22} /></span>
          <div><small>Estudiantes declarados</small><strong>{students}</strong></div>
          <span className="stat-footnote">Suma de matrículas por curso</span>
        </article>

        <article className="stat-card stat-blue">
          <span className="stat-icon"><Building2 size={22} /></span>
          <div><small>Perfil institucional</small><strong>{configured ? '100%' : '0%'}</strong></div>
          {canAccess(user?.permissions ?? [], 'organization.view') && (
            <Link to="/organizacion">{configured ? 'Revisar' : 'Configurar'} <ArrowRight size={15} /></Link>
          )}
        </article>
      </section>

      <section className="dashboard-grid">
        <Card title="Acciones rápidas" subtitle="Acciones disponibles para tu rol.">
          <div className="quick-actions">
            {canAccess(user?.permissions ?? [], 'people.view') && (
              <Link to="/personas" className="quick-action">
                <Users size={20} />
                <div><strong>Abrir personas</strong><small>Directorio y perfiles institucionales.</small></div>
                <ArrowRight size={17} />
              </Link>
            )}
            {canAccess(user?.permissions ?? [], 'courses.view') && (
              <Link to="/cursos" className="quick-action">
                <GraduationCap size={20} />
                <div><strong>Abrir cursos</strong><small>Jefaturas, niveles y matrícula.</small></div>
                <ArrowRight size={17} />
              </Link>
            )}
            {canAccess(user?.permissions ?? [], 'organization.view') && (
              <Link to="/organizacion" className="quick-action">
                <Building2 size={20} />
                <div><strong>Perfil institucional</strong><small>Datos principales del establecimiento.</small></div>
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </Card>

        <Card title="Contexto de sesión" subtitle="Identidad activa entregada por EduCore.">
          <div className="module-status-list">
            <div><span><i className="status-dot active" />Sesión</span><Badge variant="success">Protegida</Badge></div>
            <div><span><i className="status-dot active" />Rol</span><Badge variant="info">{user?.role.name}</Badge></div>
            <div><span><i className="status-dot active" />Institución</span><Badge variant="success">Activa</Badge></div>
            <div><span><i className="status-dot pending" />Firebase Auth</span><Badge variant="warning">Adaptador siguiente</Badge></div>
          </div>
        </Card>
      </section>

      <section className="vision-banner">
        <div>
          <span>ARQUITECTURA DE AUTENTICACIÓN</span>
          <h2>La interfaz ya no depende de una identidad fija</h2>
          <p>AuthGateway permite sustituir el acceso local por Firebase Authentication sin reescribir las rutas ni el workspace.</p>
        </div>
        <span className="vision-number">0.4</span>
      </section>
    </div>
  );
}
