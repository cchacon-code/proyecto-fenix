import type {
  AcademicYear,
  Assessment,
  AttendanceRecord,
  CalendarEvent,
  LessonPlan,
  Notification,
  PlanningUnit,
  Subject,
} from '../../domain/entities';
import type { Course } from '../../modules/educourses';
import type { OrganizationProfile } from '../../modules/eduorganization';
import type { Person } from '../../modules/edupeople';
import type { Repository } from './Repository';

export interface PeopleRepository extends Repository<Person & import('../../domain/entities').BaseEntity> {}
export interface CourseRepository extends Repository<Course & import('../../domain/entities').BaseEntity> {}
export interface OrganizationRepository extends Repository<OrganizationProfile & import('../../domain/entities').BaseEntity> {}
export interface AcademicYearRepository extends Repository<AcademicYear> {}
export interface SubjectRepository extends Repository<Subject> {}
export interface PlanningUnitRepository extends Repository<PlanningUnit> {}
export interface LessonPlanRepository extends Repository<LessonPlan> {}
export interface AssessmentRepository extends Repository<Assessment> {}
export interface AttendanceRepository extends Repository<AttendanceRecord> {}
export interface CalendarRepository extends Repository<CalendarEvent> {}
export interface NotificationRepository extends Repository<Notification> {}
