id: logging-debug
title: Logging & Debug Output
---

Minimal by default; enable debug for deeper diagnostics.

## Default Output
Only warnings and errors are printed by default (things that affect generation such as config/file layout conflicts).

## Enable Debug
```bash
DEBUG_PRISMA_VALIBOT=1 npx prisma generate
# or namespace via DEBUG
DEBUG=prisma-valibot npx prisma generate
# or enable all debug (noisy)
DEBUG=1 npx prisma generate
```

Add npm script:
```jsonc
"gen:debug": "DEBUG_PRISMA_VALIBOT=1 prisma generate"
```

## Typical Messages
- Output path precedence (generator block vs JSON config).
- Config load fallback/validation warnings.
- Generation progress (only when debug is enabled).

## Tips
- Keep a failing run's logs when filing an issue.
- Turn off DEBUG in CI to reduce noise.
