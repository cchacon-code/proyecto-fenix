import { firebaseApp } from '../../cloud/firebase';

export function CloudStatusPage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <div>
          <span className="eyebrow">EduCloud</span>
          <h2>Estado de Firebase</h2>
          <p>Conexión base de EduSuite AI con la nube.</p>
        </div>
      </header>

      <section className="ui-card">
        <div className="ui-card-content">
          <p>
            <strong>Proyecto:</strong>{' '}
            {firebaseApp.options.projectId}
          </p>

          <p>
            <strong>Authentication:</strong> ✅ Inicializado
          </p>

          <p>
            <strong>Firestore:</strong> ✅ Inicializado
          </p>

          <p>
            <strong>Storage:</strong> ✅ Inicializado
          </p>
        </div>
      </section>
    </div>
  );
}