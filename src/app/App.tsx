import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './layout/AppLayout';
import { CoursesPage } from './pages/CoursesPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { HomePage } from './pages/HomePage';
import { OrganizationPage } from './pages/OrganizationPage';
import { PeoplePage } from './pages/PeoplePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/personas" element={<PeoplePage />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/organizacion" element={<OrganizationPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
