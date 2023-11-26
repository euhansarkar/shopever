export const categorySearchableFields: string[] = [`name`, `description`];

export const categoryFilterableFields: string[] = [`searchTerm`, `id`, `parent_id`, `position`, `meta_SEO_id`, `attribute_group_id`, `category_id`];


export const categoryRelationalFields: string[] = [`meta_SEO_id`, `attribute_group_id`, `category_id`];

export const categoryRelationalFieldsMapper: { [key: string]: string } = { meta_SEO_id: `meta_SEO_id`, attribute_group_id: `attribute_group_id`, category_id: `category_id` };