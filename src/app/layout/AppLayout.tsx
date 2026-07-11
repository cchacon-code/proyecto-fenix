import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Sidebar } from './Sidebar';

const pageNames: Record<string, string> = {
  '/inicio': 'Inicio',
  '/personas': 'Personas',
  '/cursos': 'Cursos',
  '/organizacion': 'Organización',
  '/design-system': 'Design System',
  '/datos': 'Datos',
};

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPage = pageNames[location.pathname] ?? 'EduSuite AI';

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <section className="app-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="menu-button"
              aria-label="Abrir menú"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div>
              <span className="breadcrumb">EduSuite AI / {currentPage}</span>
              <strong>{currentPage}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <button type="button" className="search-trigger">
              <span>⌕</span>
              <span>Buscar en EduSuite</span>
              <kbd>Ctrl K</kbd>
            </button>

            <span className="release-badge">v0.3 Alpha</span>

            <button type="button" className="user-menu" aria-label="Menú de usuario">
              <span className="user-avatar">CC</span>
              <span className="user-copy">
                <strong>Carlos Chacón</strong>
                <small>Administrador</small>
              </span>
            </button>
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
