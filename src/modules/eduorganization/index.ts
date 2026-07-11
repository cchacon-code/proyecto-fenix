import { OrganizationProfileService } from './services/organizationProfileService';

export const organizationProfileService =
  new OrganizationProfileService();

export { OrganizationProfilePanel } from './components/OrganizationProfilePanel';

export type {
  OrganizationProfile,
} from './domain/organizationProfile';