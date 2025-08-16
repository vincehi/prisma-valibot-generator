<div align="center">
	<h1>Prisma Valibot Generator</h1>
	<p><strong>Prisma → Valibot in one generate. Ship validated, typed data everywhere.</strong></p>
	<p>
		<a href="https://www.npmjs.com/package/prisma-valibot-generator"><img alt="npm version" src="https://img.shields.io/npm/v/prisma-valibot-generator.svg?color=16C464&label=npm"></a>
		<a href="https://www.npmjs.com/package/prisma-valibot-generator"><img alt="downloads" src="https://img.shields.io/npm/dw/prisma-valibot-generator.svg?color=8B5CF6&label=downloads"></a>
		<a href="https://github.com/omar-dulaimi/prisma-valibot-generator/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/omar-dulaimi/prisma-valibot-generator/ci.yml?branch=master&label=CI"></a>
		<a href="https://github.com/omar-dulaimi/prisma-valibot-generator/blob/master/LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-0a0a0a.svg"></a>
		<img alt="TypeScript" src="https://img.shields.io/badge/types-TypeScript-blue.svg">
		<img alt="Module formats" src="https://img.shields.io/badge/modules-ESM%20%2B%20CJS-444.svg">
		<!-- Docs website temporarily disabled
		<a href="https://omar-dulaimi.github.io/prisma-valibot-generator/"><img alt="Docs" src="https://img.shields.io/badge/docs-website-0ea5e9.svg"></a>
		-->
	</p>
	<sub>
		Prisma → Valibot generator: zero‑boilerplate validation for your models.<br/>
		MVP: Full | Create | Update validators · small, tree‑shakeable runtime
	</sub>
</div>

<!-- Docs website temporarily disabled: https://omar-dulaimi.github.io/prisma-valibot-generator/ -->

## Highlights

- Generate Valibot schemas from your Prisma models
- Per-model exports:
  - `{Model}Schema` (all fields required)
  - `Create{Model}Schema` (required scalars only)
  - `Update{Model}Schema` (all fields optional)
- Scalar mapping: String/Int/Float/Boolean/DateTime/Json/Decimal/BigInt/Bytes
- Relations are `v.any()` in MVP (roadmap: relation handling)

## Prerequisites

- Node.js 18+
- Prisma 6.12+
- valibot

## Quick start

1) Star this repo 🌟

2) Install

```bash
npm i -D prisma-valibot-generator
# pnpm: pnpm add -D prisma-valibot-generator
# yarn: yarn add -D prisma-valibot-generator
# bun:  bun add -d prisma-valibot-generator
```

3) Add a generator block to your `schema.prisma`

```prisma
generator valibot {
	provider = "prisma-valibot-generator"
	output   = "./src/generated/valibot" // optional
}
```

4) Generate

```bash
npx prisma generate
```

5) Import and use

```ts
import * as v from 'valibot';
import { UserSchema, CreateUserSchema, UpdateUserSchema } from './src/generated/valibot';

v.parse(CreateUserSchema, { email: 'a@b.com' });
v.parse(UpdateUserSchema, { name: 'New Name' });
```

<!-- ## Docs & recipes -->

<!-- Docs website temporarily disabled:
- Quick Start, concepts, and MVP notes: https://omar-dulaimi.github.io/prisma-valibot-generator/
-->

## Sponsor ❤️

If this saves you time or prevents bugs, please consider sponsoring to support maintenance and new features.

→ https://github.com/sponsors/omar-dulaimi

## Contributing

PRs welcome. Keep diffs focused and discuss larger changes in an issue first. See the test suites for expected behavior and coverage.

## License

MIT © [Omar Dulaimi](https://github.com/omar-dulaimi)

