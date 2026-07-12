import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../auth/AuthProvider';
import { ErrorBoundary, FeedbackProvider } from '../shared/feedback';
import { AppLayout } from './layout/AppLayout';
import { PermissionRoute } from './routing/PermissionRoute';
import { ProtectedRoute } from './routing/ProtectedRoute';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
import { CoursesPage } from './pages/CoursesPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { FoundationPage } from './pages/FoundationPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { PeoplePage } from './pages/PeoplePage';
import { SettingsPage } from './pages/SettingsPage';
import { StoragePage } from './pages/StoragePage';
import { CloudStatusPage } from './pages/CloudStatusPage';

export function App() {
  return (
    <ErrorBoundary>
      <FeedbackProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/acceso-denegado" element={<AccessDeniedPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate to="/inicio" replace />} />
                  <Route path="/inicio" element={<HomePage />} />

                  <Route element={<PermissionRoute permission="people.view" />}>
                    <Route path="/personas" element={<PeoplePage />} />
                  </Route>

                  <Route element={<PermissionRoute permission="courses.view" />}>
                    <Route path="/cursos" element={<CoursesPage />} />
                  </Route>

                  <Route element={<PermissionRoute permission="organization.view" />}>
                    <Route path="/organizacion" element={<OrganizationPage />} />
                  </Route>

                  <Route element={<PermissionRoute permission="data.view" />}>
                    <Route path="/datos" element={<StoragePage />} />
                  </Route>

                  <Route element={<PermissionRoute permission="design.view" />}>
                    <Route path="/design-system" element={<DesignSystemPage />} />
                  </Route>

                  <Route element={<PermissionRoute permission="settings.view" />}>
                    <Route path="/configuracion" element={<SettingsPage />} />
                    <Route path="/foundation" element={<FoundationPage />} />
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/inicio" replace />} />
              <Route path="/cloud" element={<CloudStatusPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FeedbackProvider>
    </ErrorBoundary>
  );
}
