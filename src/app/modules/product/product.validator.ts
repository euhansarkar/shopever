import { z } from "zod";

//creation

const imageURL = z.object({
    image_url: z.string({ required_error: `image URL is required` })
})

const metaSEO = z.object({
    parent_id: z.string({ required_error: `parent id is required` }),
    meta_title: z.string({ required_error: `meta title is required` }),
    meta_description: z.string({ required_error: `meta description is required` }),
    url_key: z.string({ required_error: `url key is required` })
});


const productAttributeValue = z.object({
    attribute_option_id: z.string({ required_error: `attribute option id is required` }),
    extra_price: z.number({ required_error: `extra price is required` }),
});

const productAttribute = z.object({
    attribute_id: z.string({ required_error: `attribute id is required` }),
    product_attribute_values: z.array(productAttributeValue).refine(data => data.length > 0, { message: 'Product attribute values are required' }),
});


const create = z.object({
    body: z.object({
        name: z.string().refine(data => data.trim() !== '', { message: 'Name is required' }),
        description: z.string().refine(data => data.trim() !== '', { message: 'Description is required' }),
        short_description: z.string().refine(data => data.trim() !== '', { message: 'Short description is required' }),
        status: z.boolean().refine(data => data !== undefined, { message: 'Status is required' }),
        sku: z.string().refine(data => data.trim() !== '', { message: 'SKU is required' }),
        price: z.number().refine(data => data !== undefined, { message: 'Price is required' }),
        weight: z.number().refine(data => data !== undefined, { message: 'Weight is required' }),
        qty: z.number().refine(data => data !== undefined, { message: 'Quantity is required' }),
        manage_stock: z.number().refine(data => data !== undefined, { message: 'Manage stock is required' }),
        stock_availability: z.number().refine(data => data !== undefined, { message: 'Stock availability is required' }),
        tax_class: z.boolean().refine(data => data !== undefined, { message: 'Tax class is required' }),
        visibility: z.boolean().refine(data => data !== undefined, { message: 'Visibility is required' }),
        attribute_group_id: z.string().nullable().refine(data => data !== undefined, { message: 'Attribute group ID is required' }),
        category_id: z.string().refine(data => data.trim() !== '', { message: 'Category ID is required' }),
        images: z.array(imageURL).refine(data => data.length > 0, { message: 'Images are required' }),
        meta_seo: metaSEO,
        product_attributes: z.array(productAttribute).refine(data => data.length > 0, { message: 'Product attributes are required' }),
    })
});


//updation

const imageURLOptional = z.object({
    image_url: z.string().optional(),
    isDeleted: z.boolean().optional(),
})

const metaSEOOptional = z.object({
    parent_id: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    url_key: z.string().optional()
});


const productAttributeValueOptional = z.object({
    attribute_option_id: z.string().optional(),
    extra_price: z.number().optional(),
    is_deleted: z.boolean().optional()
});

const productAttributeOptional = z.object({
    attribute_id: z.string().optional(),
    product_attribute_values: z.array(productAttributeValueOptional).optional(),
});


const update = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        short_description: z.string().optional(),
        status: z.boolean().optional(),
        sku: z.string().optional(),
        price: z.number().optional(),
        weight: z.number().optional(),
        qty: z.number().optional(),
        manage_stock: z.number().optional(),
        stock_availability: z.number().optional(),
        tax_class: z.boolean().optional(),
        visibility: z.boolean().optional(),
        attribute_group_id: z.string().optional(),
        category_id: z.string().optional(),
        images: z.array(imageURLOptional).optional(),
        meta_seo: metaSEOOptional.optional(),
        product_attributes: z.array(productAttributeOptional).optional(),
    }),
});


export const ProductValidator = { create, update }
