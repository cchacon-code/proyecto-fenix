# Instalación — Sprint 6.2 Firebase Authentication

1. Copia todo el contenido de este paquete dentro de la raíz de `proyecto-fenix`.
2. Selecciona **Reemplazar los archivos en el destino**.
3. En tu archivo `.env`, agrega:

```env
VITE_BOOTSTRAP_ADMIN_EMAIL=cchaconh1411@gmail.com
```

4. Verifica que Authentication tenga habilitado **Correo electrónico/contraseña**.
5. En Firebase Authentication, confirma que exista tu usuario administrador.
6. En CMD ejecuta:

```cmd
npm install
npm run dev
```

## Pruebas

- Iniciar sesión con el correo y contraseña creados en Firebase.
- Presionar F5: la sesión debe continuar.
- Cerrar sesión desde la barra superior.
- Probar una contraseña incorrecta.
- Escribir el correo y usar “¿Olvidaste tu contraseña?”.

## Nota temporal

El login ya es real. Hasta Sprint 6.3, el rol administrador se determina con
`VITE_BOOTSTRAP_ADMIN_EMAIL` y la organización se inicializa como Educenter.
En 6.3 ambos datos serán leídos desde Firestore.
