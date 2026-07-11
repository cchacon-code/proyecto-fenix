import { NavLink } from 'react-router-dom';

const mainNavigation = [
  { to: '/inicio', label: 'Inicio', icon: '⌂' },
  { to: '/personas', label: 'Personas', icon: '👥' },
  { to: '/cursos', label: 'Cursos', icon: '🎓' },
  { to: '/organizacion', label: 'Organización', icon: '🏫' },
];

const systemNavigation = [
  { to: '/datos', label: 'Datos', icon: '▦' },
  { to: '/design-system', label: 'Design System', icon: '◈' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  function renderLink(item: { to: string; label: string; icon: string }) {
    return (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onClose}
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        <span className="nav-icon">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop ${open ? 'sidebar-backdrop-visible' : ''}`}
        aria-label="Cerrar menú"
        onClick={onClose}
      />

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">F</div>

          <div>
            <strong>EduSuite AI</strong>
            <small>Proyecto Fénix</small>
          </div>
        </div>

        <div className="sidebar-school">
          <span className="school-avatar">EC</span>
          <div>
            <strong>Educenter</strong>
            <small>Calle Larga</small>
          </div>
          <span>⌄</span>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          <span className="nav-section-label">Gestión</span>
          {mainNavigation.map(renderLink)}

          <span className="nav-section-label nav-section-spaced">Sistema</span>
          {systemNavigation.map(renderLink)}
        </nav>

        <footer className="sidebar-footer">
          <div className="kernel-indicator">
            <span className="kernel-dot" />
            <div>
              <strong>EduCore operativo</strong>
              <small>Todos los servicios activos</small>
            </div>
          </div>
        </footer>
      </aside>
    </>
  );
}
