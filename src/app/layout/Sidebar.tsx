import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Cloud,
  Database,
  GraduationCap,
  LayoutDashboard,
  Palette,
  Settings,
  Waypoints,
  Users,
} from "lucide-react";
import { useAuth } from '../../auth/AuthProvider';
import { canAccess } from '../../auth/permissions';

interface NavigationItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  enabled: boolean;
  permission?: string;
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

const groups: NavigationGroup[] = [
  {
    title: 'Principal',
    items: [
      { to: '/inicio', label: 'Centro de comando', icon: LayoutDashboard, enabled: true, permission: 'dashboard.view' },
      { to: '/personas', label: 'EduPeople', icon: Users, enabled: true, permission: 'people.view' },
      { to: '/cursos', label: 'EduCourses', icon: GraduationCap, enabled: true, permission: 'courses.view' },
      { to: '/organizacion', label: 'EduOrganization', icon: Building2, enabled: true, permission: 'organization.view' },
      {
  to: '/cloud',
  label: 'EduCloud',
  icon: Cloud,
  enabled: true,
  permission: 'dashboard.view'
},
    ],
  },
  {
    title: 'Académico',
    items: [
      { to: '/asignaturas', label: 'EduSubjects', icon: BookOpen, enabled: false },
      { to: '/planificacion', label: 'EduPlanning', icon: BarChart3, enabled: false },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { to: '/datos', label: 'Datos', icon: Database, enabled: true, permission: 'data.view' },
      { to: '/design-system', label: 'Design System', icon: Palette, enabled: true, permission: 'design.view' },
      { to: '/configuracion', label: 'Configuración', icon: Settings, enabled: true, permission: 'settings.view' },
      { to: '/foundation', label: 'Foundation 0.5', icon: Waypoints, enabled: true, permission: 'settings.view' },
    ],
  },
];

export function Sidebar() {
  const { user } = useAuth();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Principal: true,
    Académico: true,
    Sistema: true,
  });

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.permission || canAccess(user?.permissions ?? [], item.permission),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">ES</div>
        <div>
          <strong>EduSuite AI</strong>
          <small>Más tiempo para educar</small>
        </div>
      </div>

      <div className="tenant-card">
        <Building2 size={16} />
        <div>
          <small>Institución activa</small>
          <strong>{user?.organization.name}</strong>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación principal">
        {visibleGroups.map((group) => (
          <section className="nav-group" key={group.title}>
            <button
              type="button"
              className="nav-group-button"
              onClick={() =>
                setOpenGroups((current) => ({
                  ...current,
                  [group.title]: !current[group.title],
                }))
              }
            >
              <span>{group.title}</span>
              {openGroups[group.title] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </button>

            {openGroups[group.title] && (
              <div className="nav-group-links">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  if (!item.enabled) {
                    return (
                      <div className="nav-link nav-link-disabled" key={item.to} title="Próximamente">
                        <Icon size={18} />
                        <span>{item.label}</span>
                        <small>Pronto</small>
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? 'nav-link nav-link-active' : 'nav-link'
                      }
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <span className="system-dot" />
        <div>
          <strong>EduCore operativo</strong>
          <small>Foundation 0.5 · {user?.role.name}</small>
        </div>
      </footer>
    </aside>
  );
}
