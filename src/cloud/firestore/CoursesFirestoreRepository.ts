import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../firebase';
import type { Course } from '../../modules/educourses/domain/course';

function toCourse(id: string, data: Record<string, unknown>): Course {
  return {
    id,
    organizationId: String(data.organizationId ?? ''),
    academicYear: Number(data.academicYear ?? new Date().getFullYear()),
    level: data.level as Course['level'],
    letter: String(data.letter ?? ''),
    headTeacherId:
      typeof data.headTeacherId === 'string' && data.headTeacherId.length > 0
        ? data.headTeacherId
        : undefined,
    studentCount: Number(data.studentCount ?? 0),
    active: data.active !== false,
  };
}

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

    return onSnapshot(
      reference,
      (snapshot) => {
        const courses = snapshot.docs
          .map((item) =>
            toCourse(item.id, item.data() as Record<string, unknown>),
          )
          .sort((left, right) => {
            if (left.academicYear !== right.academicYear) {
              return right.academicYear - left.academicYear;
            }

            return `${left.level} ${left.letter}`.localeCompare(
              `${right.level} ${right.letter}`,
              'es',
            );
          });

        callback(courses);
      },
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

    await setDoc(
      reference,
      {
        ...course,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }

  async remove(
    organizationId: string,
    courseId: string,
  ): Promise<void> {
    await deleteDoc(
      doc(
        firestoreDb,
        'organizations',
        organizationId,
        'courses',
        courseId,
      ),
    );
  }
}

export const coursesFirestoreRepository =
  new CoursesFirestoreRepository();
