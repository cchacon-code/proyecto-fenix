import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AccessDeniedPage() {
  return (
    <div className="access-denied-page">
      <ShieldX size={48} />
      <span className="eyebrow">Acceso restringido</span>
      <h1>No tienes permiso para abrir esta sección</h1>
      <p>Tu rol actual no incluye la autorización necesaria.</p>
      <Link to="/inicio" className="ui-button ui-button-primary">Volver al inicio</Link>
    </div>
  );
}
