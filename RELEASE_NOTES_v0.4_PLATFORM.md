# EduSuite AI v0.4 Platform

## Incluye

- Pantalla de login profesional.
- AuthGateway desacoplado, con implementación local reemplazable por Firebase.
- Restauración y cierre de sesión mediante EduCore.
- Rutas protegidas.
- Rutas autorizadas por permisos.
- Menú lateral dinámico según rol.
- Perfil de usuario real dentro de la sesión.
- Página de acceso denegado.
- Workspace y acciones rápidas adaptadas al rol.
- Página de configuración con permisos efectivos.

## Cuentas de validación

Contraseña común: `EduSuite2026!`

- `admin@edusuite.ai`
- `coordinacion@edusuite.ai`
- `docente@edusuite.ai`

## Importante

Esta release implementa autenticación local desacoplada y no afirma conexión real con Firebase Authentication. La arquitectura permite sustituir `LocalAuthGateway` por `FirebaseAuthGateway` en la siguiente release.
