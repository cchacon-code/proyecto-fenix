import { SubjectsPanel } from '../../modules/edusubjects/components/SubjectsPanel';

export function SubjectsPage() {
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <span className="eyebrow">EduSubjects</span>
          <h2>Asignaturas</h2>
          <p>Gestión curricular y carga horaria semanal.</p>
        </div>
      </section>

      <SubjectsPanel />
    </div>
  );
}
