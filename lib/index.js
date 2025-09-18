"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Prisma Valibot Generator entrypoint
const generator_helper_1 = require("@prisma/generator-helper");
const valibot_generator_1 = require("./valibot-generator");
(0, generator_helper_1.generatorHandler)({
    onManifest: () => ({
        defaultOutput: './generated',
        prettyName: 'Prisma Valibot Generator',
    }),
    onGenerate: valibot_generator_1.generateValibot,
});
//# sourceMappingURL=index.js.map