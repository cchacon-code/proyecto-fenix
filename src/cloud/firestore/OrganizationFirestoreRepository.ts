import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { OrganizationProfile } from '../../modules/eduorganization/domain/organizationProfile';

export class OrganizationFirestoreRepository {
  async load(organizationId: string): Promise<OrganizationProfile | null> {
    const snapshot = await getDoc(doc(
      firestoreDb,
      'organizations',
      organizationId,
      'settings',
      'profile',
    ));
    return snapshot.exists() ? snapshot.data() as OrganizationProfile : null;
  }

  async save(organizationId: string, profile: OrganizationProfile): Promise<void> {
    await setDoc(doc(
      firestoreDb,
      'organizations',
      organizationId,
      'settings',
      'profile',
    ), {
      ...profile,
      id: organizationId,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    await setDoc(doc(firestoreDb, 'organizations', organizationId), {
      id: organizationId,
      name: profile.name,
      active: true,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
}

export const organizationFirestoreRepository = new OrganizationFirestoreRepository();
