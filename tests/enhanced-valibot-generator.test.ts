import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import { TestEnvironment } from './helpers/mock-generators';

describe('Enhanced Prisma Valibot Generator', () => {
  it('should generate proper enum types and validation', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-enums');
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

generator valibot {
  provider = "node ${process.cwd()}/lib/generator.js"
  output   = "${env.outputDir}"
}

enum Status {
  ACTIVE
  INACTIVE
  PENDING
}

model User {
  id     Int    @id @default(autoincrement())
  email  String @unique
  status Status
}
`;

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);
    await env.runGeneration();

    const mod = await import(env.outputDir + '/index.ts');
    const { UserSchema, StatusEnum, StatusValues } = mod as any;

    // Test enum values export
    expect(StatusValues).toEqual(['ACTIVE', 'INACTIVE', 'PENDING']);

    // Test enum validation
    expect(v.safeParse(StatusEnum, 'ACTIVE').success).toBe(true);
    expect(v.safeParse(StatusEnum, 'INVALID').success).toBe(false);

    // Test schema with enum field
    const validUser = v.safeParse(UserSchema, {
      id: 1,
      email: 'test@example.com',
      status: 'ACTIVE',
    });
    expect(validUser.success).toBe(true);

    const invalidUser = v.safeParse(UserSchema, {
      id: 1,
      email: 'test@example.com',
      status: 'INVALID_STATUS',
    });
    expect(invalidUser.success).toBe(false);

    await env.cleanup();
  });

  it('should support enumValue configuration with dbName', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-enum-dbname');
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

generator valibot {
  provider   = "node ${process.cwd()}/lib/generator.js"
  output     = "${env.outputDir}"
  enumValue  = "dbName"
}

enum Priority {
  LOW    @map("low_priority")
  HIGH   @map("high_priority")
  URGENT @map("urgent_priority")
}

model Task {
  id       Int      @id @default(autoincrement())
  priority Priority
}
`;

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);
    await env.runGeneration();

    const mod = await import(env.outputDir + '/index.ts');
    const { PriorityValues, PriorityEnum } = mod as any;

    // Should use dbName values
    expect(PriorityValues).toEqual([
      'low_priority',
      'high_priority',
      'urgent_priority',
    ]);

    // Test validation with dbName values
    expect(v.safeParse(PriorityEnum, 'low_priority').success).toBe(true);
    expect(v.safeParse(PriorityEnum, 'LOW').success).toBe(false);

    await env.cleanup();
  });

  it('should handle array fields correctly', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-arrays');
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://localhost:5432/test"
}

generator valibot {
  provider = "node ${process.cwd()}/lib/generator.js"
  output   = "${env.outputDir}"
}

model User {
  id    Int      @id @default(autoincrement())
  tags  String[]
  scores Int[]
}
`;

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);
    await env.runGeneration();

    const mod = await import(env.outputDir + '/index.ts');
    const { UserSchema } = mod as any;

    // Test array field validation
    const validUser = v.safeParse(UserSchema, {
      id: 1,
      tags: ['tag1', 'tag2'],
      scores: [100, 95, 88],
    });
    expect(validUser.success).toBe(true);

    const invalidUser = v.safeParse(UserSchema, {
      id: 1,
      tags: 'not-an-array',
      scores: [100, 95, 88],
    });
    expect(invalidUser.success).toBe(false);

    await env.cleanup();
  });

  it('should throw error for invalid enumValue config', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-invalid-config');
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

generator valibot {
  provider   = "node ${process.cwd()}/lib/generator.js"
  output     = "${env.outputDir}"
  enumValue  = "invalid"
}

enum Status {
  ACTIVE
  INACTIVE
}

model User {
  id     Int    @id @default(autoincrement())
  status Status
}
`;

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);

    // Should throw error for invalid config
    await expect(env.runGeneration()).rejects.toThrow(
      "Invalid enumValue config: 'invalid'. Must be 'name' or 'dbName'.",
    );

    await env.cleanup();
  });

  it('should exclude relation fields correctly', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-relations');
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

generator valibot {
  provider = "node ${process.cwd()}/lib/generator.js"
  output   = "${env.outputDir}"
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  title    String
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
`;

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);
    await env.runGeneration();

    const mod = await import(env.outputDir + '/index.ts');
    const { UserSchema, PostSchema } = mod as any;

    // User schema should not include 'posts' relation field
    const userParseResult = v.safeParse(UserSchema, {
      id: 1,
      email: 'test@example.com',
      // No 'posts' field - should be valid
    });
    expect(userParseResult.success).toBe(true);

    // Post schema should not include 'author' relation field but should include 'authorId'
    const postParseResult = v.safeParse(PostSchema, {
      id: 1,
      title: 'Test Post',
      authorId: 1,
      // No 'author' field - should be valid
    });
    expect(postParseResult.success).toBe(true);

    await env.cleanup();
  });

  it('should generate correct Create and Update schemas', async () => {
    const env = await TestEnvironment.createTestEnv('valibot-create-update');
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

generator valibot {
  provider = "node ${process.cwd()}/lib/generator.js"
  output   = "${env.outputDir}"
}

enum Role {
  USER
  ADMIN
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;

    const { writeFileSync } = await import('fs');
    writeFileSync(env.schemaPath, schema);
    await env.runGeneration();

    const mod = await import(env.outputDir + '/index.ts');
    const { CreateUserSchema, UpdateUserSchema } = mod as any;

    // CreateUserSchema should only require fields without defaults/id/updatedAt
    const validCreate = v.safeParse(CreateUserSchema, {
      email: 'test@example.com',
      // name is optional, role has default, id/createdAt/updatedAt are auto-generated
    });
    expect(validCreate.success).toBe(true);

    const invalidCreate = v.safeParse(CreateUserSchema, {
      // Missing required email
      name: 'John Doe',
    });
    expect(invalidCreate.success).toBe(false);

    // UpdateUserSchema should make all fields optional
    const validUpdate = v.safeParse(UpdateUserSchema, {
      name: 'Updated Name',
      // All other fields are optional
    });
    expect(validUpdate.success).toBe(true);

    const emptyUpdate = v.safeParse(UpdateUserSchema, {});
    expect(emptyUpdate.success).toBe(true);

    await env.cleanup();
  });
});
