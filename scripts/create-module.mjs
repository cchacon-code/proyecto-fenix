import fs from 'node:fs';
import path from 'node:path';

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Uso: node scripts/create-module.mjs nombre-del-modulo');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(moduleName)) {
  console.error('Usa minúsculas, números o guiones, sin espacios.');
  process.exit(1);
}

const root = path.join(process.cwd(), 'src', 'modules', moduleName);

if (fs.existsSync(root)) {
  console.error(`El módulo "${moduleName}" ya existe.`);
  process.exit(1);
}

for (const folder of ['components', 'domain', 'services']) {
  fs.mkdirSync(path.join(root, folder), { recursive: true });
  fs.writeFileSync(
    path.join(root, folder, 'README.md'),
    `# ${folder}\n\nÁrea ${folder} del módulo ${moduleName}.\n`,
    'utf8'
  );
}

fs.writeFileSync(path.join(root, 'index.ts'), `// API pública del módulo ${moduleName}\n`, 'utf8');
fs.writeFileSync(path.join(root, 'README.md'), `# ${moduleName}\n\nMódulo de Proyecto Fénix.\n`, 'utf8');

console.log(`Módulo creado: src/modules/${moduleName}`);
