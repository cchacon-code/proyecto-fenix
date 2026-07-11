import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <section className="app-content">
        <header className="topbar">
          <div><span className="eyebrow">EduSuite AI</span><h1>Más tiempo para educar.</h1></div>
          <span className="release-badge">v0.2 Alpha</span>
        </header>
        <main className="page-container"><Outlet /></main>
      </section>
    </div>
  );
}
