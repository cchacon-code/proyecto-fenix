# Sprint 6.4 — EduPeople Cloud

## Resultado

EduPeople utiliza Firestore como fuente de datos y escucha cambios en tiempo real dentro de:

```text
organizations/{organizationId}/people/{personId}
```

## Pruebas

1. Iniciar sesión con una cuenta administradora.
2. Abrir Personas.
3. Crear, editar y eliminar una persona.
4. Confirmar el documento en Firestore.
5. Abrir la aplicación en otra ventana o computador y confirmar la sincronización.

## Reglas necesarias

El usuario autenticado debe tener un documento en `users/{uid}` con:

- `organizationId`
- `active: true`
- rol de administración (`admin`, `director` o `coordinator`)
