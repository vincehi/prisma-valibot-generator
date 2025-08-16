---
id: what-is
title: Prisma Valibot Generator
sidebar_label: What is it?
---

Generate strongly-typed Valibot schemas directly from your Prisma schema (DMMF). MVP supports:

- Full model validator (all fields required)
- Create validator (required scalars only)
- Update validator (all fields optional)
- Prisma scalars → Valibot mapping
- Relations treated as `v.any()` initially

Why this matters:

- Eliminates manual schema writing
- Keeps types safe end-to-end
- Small, tree-shakeable runtime via Valibot
