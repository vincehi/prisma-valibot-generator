id: troubleshooting
title: Troubleshooting
---

Quick checks for common issues.

| Symptom | Likely cause | Fix |
|--------|---------------|-----|
| Output path not where you expect | Generator block `output` takes precedence over JSON config `output` | Align or remove one of the outputs |
| No files emitted | Using a relative `output` that resolves outside project or output dir cleaned and not re-created due to permissions | Use an absolute/valid path; ensure write permissions |
| Missing some models | Prisma schema has no models, or datasource not parsed due to schema error | Fix schema errors; run `prisma validate` |
| Enums treated as `any` | Unknown scalar or enum not in DMMF | Ensure enum is defined in Prisma schema |
| Bytes/Json shape confusion | MVP maps `Bytes` to `Uint8Array` instance and `Json` to `any` | Adjust consumer code accordingly |
| Need more detail | Not seeing internal steps | Enable debug: `DEBUG_PRISMA_VALIBOT=1` |
