# ARQ002 — Design System

## 1. Copiar

Copia todo el contenido del paquete dentro de la raíz de `proyecto-fenix`.

Acepta reemplazar:
- `src/app/App.tsx`
- `src/app/layout/Sidebar.tsx`

Se agregan:
- `src/shared/ui/*`
- `src/app/pages/DesignSystemPage.tsx`
- `src/styles/design-system.css`

## 2. Importar estilos

Abre `src/main.tsx`.

Debajo de:

```tsx
import './styles/layout.css';
```

agrega:

```tsx
import './styles/design-system.css';
```

## 3. Ejecutar

En CMD:

```cmd
npm run dev
```

## 4. Probar

En la barra lateral abre `Design System`.

Debe mostrar:
- botones
- campos
- badges
- tarjetas
- estado vacío

## 5. Commit

Summary:

```text
ARQ002 - Design System reutilizable
```

Description:

```text
Se incorporan componentes compartidos de botones, campos, tarjetas, estados, badges y encabezados.
```
