# ARQ003 — Capa de Datos

## 1. Copiar

Copia todo el contenido del paquete dentro de la raíz de `proyecto-fenix`.

Acepta reemplazar:
- `src/app/App.tsx`
- `src/app/layout/Sidebar.tsx`
- servicios de EduPeople, EduCourses y EduOrganization

Se agregan:
- `src/shared/storage/*`
- `src/app/pages/StoragePage.tsx`
- `src/styles/data-layer.css`

## 2. Importar estilos

Abre `src/main.tsx`.

Debajo de:

```tsx
import './styles/design-system.css';
```

agrega:

```tsx
import './styles/data-layer.css';
```

## 3. Ejecutar

En CMD:

```cmd
npm run dev
```

## 4. Probar

- Personas sigue mostrando datos.
- Cursos sigue mostrando datos.
- Organización mantiene su perfil.
- En la barra lateral abre `Datos`.
- Deben aparecer los conteos y el proveedor `LocalStorageAdapter`.

## 5. Commit

Summary:

```text
ARQ003 - Capa de datos desacoplada
```

Description:

```text
Se implementa una interfaz de almacenamiento común y se migran EduPeople, EduCourses y EduOrganization al adaptador LocalStorage.
```
