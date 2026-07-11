import type { OrganizationProfile } from '../domain/organizationProfile';

const STORAGE_KEY = 'fenix.organization.profile';

export class OrganizationProfileService {
  save(profile: OrganizationProfile): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile),
    );
  }

  load(): OrganizationProfile | null {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  exists(): boolean {
    return this.load() !== null;
  }
}