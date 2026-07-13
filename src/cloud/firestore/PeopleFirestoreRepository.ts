import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { Person } from '../../modules/edupeople/domain/person';

function toPerson(id: string, data: Record<string, unknown>): Person {
  return {
    id,
    organizationId: String(data.organizationId ?? ''),
    firstName: String(data.firstName ?? ''),
    lastName: String(data.lastName ?? ''),
    email:
      typeof data.email === 'string' && data.email.length > 0
        ? data.email
        : undefined,
    type: data.type as Person['type'],
    active: data.active !== false,
  };
}

export class PeopleFirestoreRepository {
  subscribe(
    organizationId: string,
    callback: (people: Person[]) => void,
    onError: (error: Error) => void,
  ): () => void {
    const reference = collection(
      firestoreDb,
      'organizations',
      organizationId,
      'people',
    );

    return onSnapshot(
      reference,
      (snapshot) => {
        const people = snapshot.docs
          .map((item) =>
            toPerson(item.id, item.data() as Record<string, unknown>),
          )
          .sort((left, right) =>
            `${left.lastName} ${left.firstName}`.localeCompare(
              `${right.lastName} ${right.firstName}`,
              'es',
            ),
          );

        callback(people);
      },
      (error) => onError(error),
    );
  }

  async save(person: Person): Promise<void> {
    const reference = doc(
      firestoreDb,
      'organizations',
      person.organizationId,
      'people',
      person.id,
    );

    await setDoc(
      reference,
      {
        ...person,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }

  async remove(
    organizationId: string,
    personId: string,
  ): Promise<void> {
    await deleteDoc(
      doc(
        firestoreDb,
        'organizations',
        organizationId,
        'people',
        personId,
      ),
    );
  }
}

export const peopleFirestoreRepository =
  new PeopleFirestoreRepository();
