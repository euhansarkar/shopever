import { z } from "zod";

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


export const ProductValidator = { create }
