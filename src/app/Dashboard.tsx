import type { UserIdentity } from '../core/identity/identity';

import { KernelStatus } from './KernelStatus';
import { SessionPanel } from './SessionPanel';
import { PeoplePanel } from '../modules/edupeople/components/PeoplePanel';
import { OrganizationProfilePanel } from '../modules/eduorganization/index';
import { CoursesPanel } from '../modules/educourses/components/CoursesPanel';

interface DashboardProps {
  currentUser: UserIdentity | null;
  onStartSession: () => void;
  onCloseSession: () => void;
}

export function Dashboard({
  currentUser,
  onStartSession,
  onCloseSession,
}: DashboardProps) {
  return (
    <main className="app-shell">
      <section className="hero">
        <span className="eyebrow">
          Proyecto Fénix · Kernel 0.1 Alpha
        </span>

        <h1>Más tiempo para educar.</h1>

        <KernelStatus />

       <SessionPanel
  currentUser={currentUser}
  onStartSession={onStartSession}
  onCloseSession={onCloseSession}
/>

<PeoplePanel />
<OrganizationProfilePanel />
<CoursesPanel />

      </section>
    </main>
  );
}