import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { CloudOrganization } from '../models';

export class OrganizationCloudRepository {
  async getById(id: string): Promise<CloudOrganization | null> {
    const snapshot = await getDoc(
      doc(firestoreDb, 'organizations', id),
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as CloudOrganization;
  }

  async create(organization: CloudOrganization): Promise<void> {
    await setDoc(
      doc(firestoreDb, 'organizations', organization.id),
      {
        ...organization,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
    );
  }

  async update(
    id: string,
    changes: Partial<CloudOrganization>,
  ): Promise<void> {
    await setDoc(
      doc(firestoreDb, 'organizations', id),
      {
        ...changes,
        id,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
}

export const organizationCloudRepository =
  new OrganizationCloudRepository();
