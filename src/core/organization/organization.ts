export interface Organization {
  id: string;
  name: string;
  rut: string;
  country: string;
  region: string;
  commune: string;
  logo?: string;
  active: boolean;
}

export class OrganizationService {
  private currentOrganization: Organization | null = null;

  setOrganization(org: Organization): void {
    this.currentOrganization = org;
  }

  getOrganization(): Organization | null {
    return this.currentOrganization;
  }

  clear(): void {
    this.currentOrganization = null;
  }

  exists(): boolean {
    return this.currentOrganization !== null;
  }
}