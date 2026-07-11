import type { OrganizationProfile } from '../domain/organizationProfile';
import { storage } from '../../../shared/storage';

const STORAGE_KEY = 'fenix.organization.profile';

export class OrganizationProfileService {
  save(profile: OrganizationProfile): void {
    storage.set(STORAGE_KEY, profile);
  }

  load(): OrganizationProfile | null {
    return storage.get<OrganizationProfile>(STORAGE_KEY);
  }

  clear(): void {
    storage.remove(STORAGE_KEY);
  }

  exists(): boolean {
    return storage.has(STORAGE_KEY);
  }
}
