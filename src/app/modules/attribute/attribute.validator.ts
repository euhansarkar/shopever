import { z } from "zod";

const create = z.object({
    body: z.object({
        attribute_name: z.string({
            required_error: `attribute name is required`
        }),
        attribute_code: z.string({
            required_error: `attribute code is required`
        }),
        type: z.string({
            required_error: `type is required`
        }),
        is_required: z.boolean({
            required_error: `is required value is required`
        }),
        display_on_frontend: z.boolean({
            required_error: `display on frontend value is required`
        }),
        sort_order: z.boolean({
            required_error: `sort order value is required`
        }),
        is_filterable: z.boolean({
            required_error: `is filterable value is required`
        }),
        attribute_group_id: z.string({ required_error: `attribute group id is required` }),
        attribute_options: z.array(
            z.object({
                option_text: z.string({ required_error: `option text is required` })
            })
        )
    })
});

const attOption = z.object({
    option_text: z.string().optional(),
    is_deleted: z.boolean().optional()
})

const update = z.object({
    body: z.object({
        attribute_name: z.string().optional(),
        attribute_code: z.string().optional(),
        type: z.string().optional(),
        is_required: z.boolean().optional(),
        display_on_frontend: z.boolean().optional(),
        sort_order: z.boolean().optional(),
        is_filterable: z.boolean().optional(),
        attribute_options: z.array(attOption).optional(),
    }),
});


export const AttributeValidator = { create, update }


