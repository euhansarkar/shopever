"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeOptionValidator = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    is_deleted: zod_1.z.string().optional(),
    option_text: zod_1.z.string().optional(),
});
exports.AttributeOptionValidator = { update };
