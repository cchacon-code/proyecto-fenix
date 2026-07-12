import { useAuth } from '../../auth/AuthProvider';
import { Badge, Card, PageHeader } from '../../shared/ui';

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Plataforma"
        title="Configuración"
        description="Información de identidad y autorización de la sesión actual."
      />
      <Card title="Cuenta activa" subtitle="Contexto entregado por EduCore">
        <div className="settings-grid">
          <div><small>Nombre</small><strong>{user?.name}</strong></div>
          <div><small>Correo</small><strong>{user?.email}</strong></div>
          <div><small>Rol</small><Badge variant="info">{user?.role.name}</Badge></div>
          <div><small>Institución</small><strong>{user?.organization.name}</strong></div>
        </div>
      </Card>
      <Card title="Permisos efectivos">
        <div className="permission-cloud">
          {user?.permissions.map((permission) => (
            <Badge key={permission} variant="neutral">{permission}</Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
