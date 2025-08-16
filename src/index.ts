// Prisma Valibot Generator entrypoint
import { generatorHandler } from '@prisma/generator-helper';
import { generateValibot } from './valibot-generator';

generatorHandler({
  onManifest: () => ({
    defaultOutput: './generated',
    prettyName: 'Prisma Valibot Generator',
  }),
  onGenerate: generateValibot,
});
