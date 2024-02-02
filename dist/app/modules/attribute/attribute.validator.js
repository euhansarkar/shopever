"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        attribute_name: zod_1.z.string({
            required_error: `attribute name is required`
        }),
        attribute_code: zod_1.z.string({
            required_error: `attribute code is required`
        }),
        type: zod_1.z.string({
            required_error: `type is required`
        }),
        is_required: zod_1.z.boolean({
            required_error: `is required value is required`
        }),
        display_on_frontend: zod_1.z.boolean({
            required_error: `display on frontend value is required`
        }),
        sort_order: zod_1.z.number({
            required_error: `sort order value is required`
        }),
        is_filterable: zod_1.z.boolean({
            required_error: `is filterable value is required`
        }),
        attribute_group_id: zod_1.z.string({ required_error: `attribute group id is required` }),
        attribute_options: zod_1.z.array(zod_1.z.object({
            option_text: zod_1.z.string({ required_error: `option text is required` }),
        }))
    })
});
const attOption = zod_1.z.object({
    option_text: zod_1.z.string().optional(),
    is_deleted: zod_1.z.boolean().optional()
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        attribute_name: zod_1.z.string().optional(),
        attribute_code: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        is_required: zod_1.z.boolean().optional(),
        display_on_frontend: zod_1.z.boolean().optional(),
        sort_order: zod_1.z.number().optional(),
        is_filterable: zod_1.z.boolean().optional(),
        attribute_options: zod_1.z.array(attOption).optional(),
    }),
});
exports.AttributeValidator = { create, update };
