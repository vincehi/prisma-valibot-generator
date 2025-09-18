"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/**
 * Simple logger that hides debug logs unless explicitly enabled.
 *
 * Enable with one of:
 * - DEBUG_PRISMA_VALIBOT=1|true
 * - DEBUG=1|true
 * - DEBUG including the substring "prisma-valibot" (e.g. DEBUG=prisma-valibot)
 */
const rawDebug = ((_b = (_a = process.env.DEBUG_PRISMA_VALIBOT) !== null && _a !== void 0 ? _a : process.env.DEBUG) !== null && _b !== void 0 ? _b : '').toLowerCase();
function parseEnabled(val) {
    if (!val)
        return false;
    if (val === '1' || val === 'true')
        return true;
    // Support namespaces like DEBUG=prisma-valibot,prisma:* etc.
    return /(^|[,\s:*])(prisma[-_]?valibot)([,\s:*]|$)/.test(val);
}
const enabled = parseEnabled(rawDebug);
exports.logger = {
    debug: (...args) => {
        if (enabled)
            console.log(...args);
    },
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
    isDebugEnabled: () => enabled,
};
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map