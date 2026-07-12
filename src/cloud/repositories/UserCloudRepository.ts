import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { CloudUserProfile } from '../models';

export class UserCloudRepository {
  async getByUid(uid: string): Promise<CloudUserProfile | null> {
    const snapshot = await getDoc(doc(firestoreDb, 'users', uid));

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as CloudUserProfile;
  }

  async create(profile: CloudUserProfile): Promise<void> {
    await setDoc(doc(firestoreDb, 'users', profile.uid), {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async update(
    uid: string,
    changes: Partial<CloudUserProfile>,
  ): Promise<void> {
    await setDoc(
      doc(firestoreDb, 'users', uid),
      {
        ...changes,
        uid,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
}

export const userCloudRepository = new UserCloudRepository();
