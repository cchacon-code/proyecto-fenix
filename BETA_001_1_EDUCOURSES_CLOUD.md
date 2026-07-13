# BETA-001.1 — EduCourses Cloud

## Resultado

EduCourses usa Firestore como fuente de datos y escucha cambios en tiempo real en:

```text
organizations/{organizationId}/courses/{courseId}
```

## Funciones

- Crear cursos.
- Editar cursos.
- Eliminar cursos con confirmación.
- Asignar profesor jefe desde EduPeople Cloud.
- Sincronizar cursos entre ventanas y computadores.

## Prueba

1. Iniciar sesión como administrador.
2. Abrir Cursos.
3. Crear un curso y asignar profesor jefe.
4. Confirmar el documento en Firestore.
5. Editar y eliminar el curso.
6. Abrir otra ventana y comprobar sincronización.
