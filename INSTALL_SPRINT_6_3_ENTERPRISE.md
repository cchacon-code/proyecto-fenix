# Instalación — Sprint 6.3 Enterprise

1. Copia el contenido del paquete sobre tu repositorio actual.
2. Conserva tu archivo `.env` y la carpeta `.git`.
3. En Firebase Console publica el archivo `firebase/firestore.rules` en Firestore Database → Reglas.
4. Verifica en `.env`:

```env
VITE_BOOTSTRAP_ADMIN_EMAIL=cchaconh1411@gmail.com
```

5. Ejecuta:

```cmd
npm install
npm run dev
```

6. Cierra cualquier sesión previa e inicia sesión otra vez.
7. En Firestore deben aparecer:

- `organizations/org-educenter`
- `users/{UID_DE_TU_CUENTA}`

## Prueba

- El nombre, rol y organización del usuario deben cargarse desde Firestore.
- Al actualizar con F5, la sesión y el perfil deben mantenerse.
- Una cuenta Firebase diferente, sin perfil Firestore, debe quedar fuera de la plataforma.
