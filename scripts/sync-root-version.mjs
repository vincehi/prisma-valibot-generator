#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const rootPath = 'package.json';
const pkgPath = 'package/package.json';

function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}

try {
  const built = readJson(pkgPath);
  const root = readJson(rootPath);

  if (!built.version) {
    console.error('sync-root-version: No version found in', pkgPath);
    process.exit(1);
  }

  if (root.version === built.version) {
    console.log(`sync-root-version: Root already at ${root.version}`);
    process.exit(0);
  }

  const updated = { ...root, version: built.version };
  // Ensure the root package stays private
  if (typeof updated.private === 'undefined') updated.private = true;

  writeFileSync(rootPath, JSON.stringify(updated, null, 2) + '\n');
  console.log(`sync-root-version: Updated root version to ${built.version}`);
} catch (e) {
  console.error('sync-root-version: Failed to sync version', e?.message || e);
  process.exit(1);
}

