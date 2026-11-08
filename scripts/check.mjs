import { mkdir, readFile, readdir, copyFile } from 'node:fs/promises';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

const backend = spawnSync(process.execPath, ['--check', 'netlify/functions/analyze.mjs'], { encoding: 'utf8' });
if (backend.status !== 0) throw new Error(backend.stderr || 'Netlify function syntax check failed');

const html = await readFile('index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]).filter(script => script.trim());
if (!scripts.length) throw new Error('No inline application script found');
scripts.forEach((script, index) => new vm.Script(script, { filename: `index.html:inline-script-${index + 1}` }));

// The public build contains only the app shell and Netlify routing rules.
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await copyFile('_redirects', 'dist/_redirects');
await copyFile('busara-data.js', 'dist/busara-data.js');
await copyFile('design-motion.js', 'dist/design-motion.js');
const publicFiles = await readdir('dist', { withFileTypes: true });
const secretPattern = /(?:gsk_[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|hf_[A-Za-z0-9]{20,})/;
for (const entry of publicFiles) {
  if (!entry.isFile()) throw new Error(`Unexpected directory in public build: ${entry.name}`);
  if (entry.name.endsWith('.map')) throw new Error(`Source map must not be published: ${entry.name}`);
  const contents = await readFile(`dist/${entry.name}`, 'utf8');
  if (secretPattern.test(contents)) throw new Error(`Credential-like value detected in public asset: ${entry.name}`);
}

console.log(`Checked Netlify function, ${scripts.length} inline frontend script(s), and ${publicFiles.length} public assets.`);
