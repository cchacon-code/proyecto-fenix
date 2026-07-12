# Instalación v0.4

```cmd
npm install
npm run dev
```

## Pruebas

1. Abrir la aplicación: debe redirigir a `/login`.
2. Ingresar como administrador.
3. Cerrar y volver a abrir la pestaña: la sesión debe restaurarse.
4. Cerrar sesión desde la barra superior.
5. Ingresar como docente: no debe ver Datos, Design System, Organización ni Configuración.
6. Escribir manualmente `/configuracion` como docente: debe aparecer acceso denegado.
