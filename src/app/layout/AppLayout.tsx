import { Bell, LogOut, Search } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { Sidebar } from './Sidebar';

const titles: Record<string, string> = {
  '/inicio': 'Centro de comando',
  '/personas': 'EduPeople',
  '/cursos': 'EduCourses',
  '/organizacion': 'EduOrganization',
  '/datos': 'Capa de datos',
  '/design-system': 'Design System',
  '/configuracion': 'Configuración',
};

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const title = titles[location.pathname] ?? 'EduSuite AI';

  async function handleSignOut(): Promise<void> {
    await signOut();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <section className="app-content">
        <header className="topbar">
          <div className="topbar-title">
            <small>EduSuite AI / {title}</small>
            <strong>{title}</strong>
          </div>

          <div className="topbar-actions">
            <label className="global-search">
              <Search size={17} />
              <input aria-label="Buscar" placeholder="Buscar en EduSuite..." />
              <kbd>Ctrl K</kbd>
            </label>

            <button type="button" className="icon-button" aria-label="Notificaciones">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="user-menu">
              <span className="user-avatar">{initials(user?.name ?? 'Usuario')}</span>
              <div>
                <strong>{user?.name}</strong>
                <small>{user?.role.name}</small>
              </div>
              <button type="button" className="sign-out-button" onClick={handleSignOut} aria-label="Cerrar sesión">
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
