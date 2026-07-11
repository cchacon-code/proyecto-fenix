# Convenciones de desarrollo

## Carpetas
- `src/core`: servicios centrales de EduCore
- `src/app`: composición general de la interfaz
- `src/modules`: módulos funcionales
- `src/styles`: estilos globales
- `docs`: documentación
- `tests`: pruebas

## Reglas
1. Un archivo debe tener una responsabilidad clara.
2. `App.tsx` no contiene lógica de negocio.
3. Los módulos pueden consumir EduCore, pero no depender entre sí directamente.
4. No guardar secretos en GitHub.
5. Toda capacidad incluye prueba y documentación.
6. No hacer commit con errores en Problems.
