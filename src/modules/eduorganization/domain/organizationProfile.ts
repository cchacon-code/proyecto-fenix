export interface OrganizationProfile {
  id: string;

  name: string;

  rbd: string;

  dependency:
    | 'Municipal'
    | 'Particular Subvencionado'
    | 'Particular Pagado'
    | 'SLEP';

  director: string;

  utp: string;

  email: string;

  phone: string;

  address: string;

  commune: string;

  region: string;

  logo?: string;
}