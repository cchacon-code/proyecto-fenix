export interface AuditEntry {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId?: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

export class AuditService {
  private entries: AuditEntry[] = [];

  record(entry: Omit<AuditEntry, 'id' | 'occurredAt'>): AuditEntry {
    const created: AuditEntry = {
      ...entry,
      id: crypto.randomUUID(),
      occurredAt: new Date().toISOString(),
    };

    this.entries = [created, ...this.entries].slice(0, 500);
    return created;
  }

  getRecent(limit = 20): AuditEntry[] {
    return this.entries.slice(0, limit);
  }
}
