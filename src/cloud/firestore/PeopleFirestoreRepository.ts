import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { Person } from '../../modules/edupeople/domain/person';

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
    const peopleQuery = query(reference, orderBy('lastName'), orderBy('firstName'));

    return onSnapshot(
      peopleQuery,
      (snapshot) => {
        callback(snapshot.docs.map((item) => item.data() as Person));
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
    await setDoc(reference, {
      ...person,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  async remove(organizationId: string, personId: string): Promise<void> {
    await deleteDoc(doc(
      firestoreDb,
      'organizations',
      organizationId,
      'people',
      personId,
    ));
  }
}

export const peopleFirestoreRepository = new PeopleFirestoreRepository();
