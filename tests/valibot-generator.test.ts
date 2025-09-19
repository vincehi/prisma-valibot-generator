import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import {
  PrismaSchemaGenerator,
  TestEnvironment,
} from './helpers/mock-generators';

describe('Prisma Valibot Generator - MVP', () => {
  it('generates and validates basic User schemas in isolated env', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-basic');
    const schema = PrismaSchemaGenerator.createBasicValibotSchema({
      models: ['User'],
      provider: 'sqlite',
      outputPath: env.outputDir,
    });

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);
    await env.runGeneration();

    const mod = await import(env.outputDir + '/index.ts');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { UserSchema, CreateUserSchema, UpdateUserSchema } = mod as any;

    const missing = v.safeParse(UserSchema, { email: 'a@b.com' });
    expect(missing.success).toBe(false);

    const ok = v.safeParse(CreateUserSchema, { email: 'a@b.com' });
    expect(ok.success).toBe(true);
    const bad = v.safeParse(CreateUserSchema, {});
    expect(bad.success).toBe(false);

    const partial = v.safeParse(UpdateUserSchema, { email: 'a@b.com' });
    expect(partial.success).toBe(true);
    const empty = v.safeParse(UpdateUserSchema, {});
    expect(empty.success).toBe(true);

    await env.cleanup();
  });
});
