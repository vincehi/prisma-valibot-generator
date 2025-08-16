---
id: quick-start
title: Quick Start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. Install

### Requirements
| Component | Minimum |
|----------|---------|
| Node.js  | 18.x |
| Prisma   | 6.12.0 |
| Valibot  | latest |
| TypeScript (recommended) | 5.2+ |

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install prisma-valibot-generator valibot @prisma/client
```
</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add prisma-valibot-generator valibot @prisma/client
```
</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add prisma-valibot-generator valibot @prisma/client
```
</TabItem>
</Tabs>

## 2. Add generator to `schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
}

generator valibot {
  provider = "prisma-valibot-generator"
  // optional output = "./src/generated/valibot"
}
```

## 3. (Optional) Create `prisma/valibot-generator.config.json`

```jsonc
{
  "mode": "full",
  "pureModels": false
}
```

## 4. Generate

```bash
npx prisma generate
```

## 5. Consume

```ts
import { CreateUserSchema, UpdateUserSchema, UserSchema } from './src/generated/valibot';
import * as v from 'valibot';

// validate
v.parse(CreateUserSchema, { email: 'a@b.com' });
v.parse(UpdateUserSchema, { name: 'New Name' });
```

## Directory Layout (multi-file default)

```
src/generated/valibot/
  User.schema.ts
  Post.schema.ts
  index.ts
```
