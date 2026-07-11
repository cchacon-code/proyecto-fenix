# ARQ004 — Feedback global

## 1. Copiar
Copia todo el contenido del paquete dentro de la raíz de `proyecto-fenix`.
Acepta reemplazar `src/app/App.tsx`, `PeoplePanel.tsx` y `CoursesPanel.tsx`.

## 2. Importar estilos
Abre `src/main.tsx` y debajo de:
```tsx
import './styles/data-layer.css';
```
agrega:
```tsx
import './styles/feedback.css';
```

## 3. Ejecutar
```cmd
npm run dev
```

## 4. Probar
- Crear y editar personas: debe aparecer notificación.
- Eliminar personas: debe abrir confirmación propia.
- Crear y eliminar cursos: debe usar notificaciones y confirmación propia.

## 5. Commit
Summary:
```text
ARQ004 - Feedback y manejo global de errores
```
Description:
```text
Se incorporan notificaciones, confirmaciones reutilizables y una barrera global de errores.
```
