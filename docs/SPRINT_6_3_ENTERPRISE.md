# Sprint 6.3 Enterprise — Firestore Bootstrap

## Entregado

- Repositorio cloud de usuarios.
- Repositorio cloud de organizaciones.
- Bootstrap automático del primer administrador.
- Identidad, rol, organización y permisos cargados desde Firestore.
- Reglas de seguridad iniciales para perfiles y organizaciones.

## Flujo

1. Firebase Authentication valida la sesión.
2. `CloudBootstrapService` busca `users/{uid}`.
3. Si es el administrador inicial y no existe perfil:
   - crea `organizations/org-educenter`;
   - crea `users/{uid}` con rol `admin`.
4. La aplicación carga la identidad desde Firestore.

## Configuración requerida

En `.env`:

```env
VITE_BOOTSTRAP_ADMIN_EMAIL=cchaconh1411@gmail.com
```

## Seguridad

Una cuenta nueva que no tenga perfil en Firestore no puede entrar a la plataforma, salvo el correo configurado como administrador inicial.
