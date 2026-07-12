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
import type { Course } from '../../modules/educourses/domain/course';

export class CoursesFirestoreRepository {
  subscribe(
    organizationId: string,
    callback: (courses: Course[]) => void,
    onError: (error: Error) => void,
  ): () => void {
    const reference = collection(
      firestoreDb,
      'organizations',
      organizationId,
      'courses',
    );
    const coursesQuery = query(reference, orderBy('academicYear', 'desc'), orderBy('level'));

    return onSnapshot(
      coursesQuery,
      (snapshot) => callback(snapshot.docs.map((item) => item.data() as Course)),
      (error) => onError(error),
    );
  }

  async save(course: Course): Promise<void> {
    const reference = doc(
      firestoreDb,
      'organizations',
      course.organizationId,
      'courses',
      course.id,
    );
    await setDoc(reference, {
      ...course,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  async remove(organizationId: string, courseId: string): Promise<void> {
    await deleteDoc(doc(
      firestoreDb,
      'organizations',
      organizationId,
      'courses',
      courseId,
    ));
  }
}

export const coursesFirestoreRepository = new CoursesFirestoreRepository();
