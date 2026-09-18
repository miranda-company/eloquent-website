import { readFile, readdir } from 'node:fs/promises';

const stylesDirectory = new URL('../src/styles/', import.meta.url);
const styleFiles = (await readdir(stylesDirectory)).filter(
  (file) => file.endsWith('.css') && file !== 'tokens.css',
);
const localValue =
  /#[\da-f]{3,8}\b|\b(?:rgb|hsl)a?\(|(?<![\w-])\d*\.?\d+(?:rem|px|vw|vh|ch|em|ms)\b/i;
const localVariable = /^\s*--[\w-]+\s*:/;
const violations = [];

for (const file of styleFiles) {
  const lines = (await readFile(new URL(file, stylesDirectory), 'utf8')).split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('@media ') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }
    if (localValue.test(line) || localVariable.test(line)) {
      violations.push(`${file}:${index + 1}: ${trimmed}`);
    }
  });
}

if (violations.length > 0) {
  console.error('Move these visual values into src/styles/tokens.css:\n');
  console.error(violations.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Component CSS uses design tokens.');
}
