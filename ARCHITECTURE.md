# EduSuite AI — Architecture 0.5

## Principios

1. Multiinstitución desde el diseño.
2. Multiaño académico.
3. Los módulos no dependen directamente entre sí.
4. Firebase será infraestructura, no dominio.
5. Toda operación relevante genera auditoría.
6. La IA propone y una persona valida.

## Capas

```text
UI / Routes
    ↓
Application / Use cases
    ↓
Domain / Entities and rules
    ↓
Repository contracts
    ↓
Infrastructure adapters
    ↓
Firebase / Firestore / Storage
```

## Contexto obligatorio

Cada entidad persistente debe incluir:

- `organizationId`
- `academicYearId`
- `createdBy`
- `createdAt`
- `updatedBy`
- `updatedAt`
- `active`

## EduKernel

EduKernel concentra capacidades transversales:

- Event Bus
- Feature Flags
- Audit
- Logging
- Configuración

## Dependencias

Los módulos pueden depender de contratos compartidos y de EduKernel. No deben importar servicios internos de otros módulos. Las relaciones se resuelven mediante identificadores, casos de uso o eventos.
