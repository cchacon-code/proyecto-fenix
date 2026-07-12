# Sprint 6.2 — Firebase Authentication

## Funcionalidades

- Inicio de sesión real con Firebase Authentication.
- Restauración automática de sesión con `onAuthStateChanged`.
- Cierre de sesión real.
- Recuperación de contraseña por correo.
- Traducción básica de errores de Firebase.
- Integración de la identidad autenticada con EduCore.

## Configuración obligatoria

Agrega a tu archivo `.env`:

```env
VITE_BOOTSTRAP_ADMIN_EMAIL=cchaconh1411@gmail.com
```

Hasta Sprint 6.3, la organización y el rol se inicializan temporalmente desde
la configuración bootstrap. En 6.3 se cargarán desde Firestore.

## Pruebas

1. Ingresar con una cuenta existente en Firebase Authentication.
2. Actualizar con F5 y comprobar que la sesión continúa.
3. Cerrar sesión desde la barra superior.
4. Intentar una contraseña incorrecta.
5. Solicitar recuperación de contraseña.
