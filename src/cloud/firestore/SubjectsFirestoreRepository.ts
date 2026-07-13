import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { Subject } from '../../modules/edusubjects';

function toSubject(id: string, data: Record<string, unknown>): Subject {
  return {
    id,
    organizationId: String(data.organizationId ?? ''),
    name: String(data.name ?? ''),
    code: String(data.code ?? ''),
    color: String(data.color ?? '#2563eb'),
    weeklyHours: Number(data.weeklyHours ?? 0),
    active: data.active !== false,
  };
}

export class SubjectsFirestoreRepository {
  subscribe(
    organizationId: string,
    callback: (subjects: Subject[]) => void,
    onError: (error: Error) => void,
  ): () => void {
    const reference = collection(
      firestoreDb,
      'organizations',
      organizationId,
      'subjects',
    );

    return onSnapshot(
      reference,
      (snapshot) => {
        const subjects = snapshot.docs
          .map((item) =>
            toSubject(item.id, item.data() as Record<string, unknown>),
          )
          .sort((left, right) =>
            left.name.localeCompare(right.name, 'es'),
          );

        callback(subjects);
      },
      (error) => onError(error),
    );
  }

  async save(subject: Subject): Promise<void> {
    const reference = doc(
      firestoreDb,
      'organizations',
      subject.organizationId,
      'subjects',
      subject.id,
    );

    await setDoc(
      reference,
      {
        ...subject,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }

  async remove(
    organizationId: string,
    subjectId: string,
  ): Promise<void> {
    await deleteDoc(
      doc(
        firestoreDb,
        'organizations',
        organizationId,
        'subjects',
        subjectId,
      ),
    );
  }
}

export const subjectsFirestoreRepository =
  new SubjectsFirestoreRepository();
