# EduSuite AI — Domain Model 0.5

## Raíz

`Organization` es la raíz de aislamiento de datos.

## Estructura académica

- Organization
- Campus
- AcademicYear
- Course
- Subject
- CourseAssignment
- Enrollment

## Personas

- UserIdentity
- Person
- Teacher
- Student
- Guardian
- Staff

## Planificación

- PlanningUnit
- LessonPlan
- LearningObjective
- Resource
- PlanningReview

## Evaluación

- Assessment
- Rubric
- Grade
- Feedback

## Gestión

- AttendanceRecord
- CalendarEvent
- Notification
- AuditEntry

## Regla de aislamiento

Ninguna consulta puede ejecutarse sin `organizationId`. Las operaciones académicas también requieren `academicYearId`.
