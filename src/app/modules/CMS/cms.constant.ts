export const CMSSearchableFields: string[] = [`name`, `layout`, `content`];

export const CMSFilterableFields: string[] = [`searchTerm`, `id`, `content`, `name`, `metaSEOId`, `layout`];


export const CMSRelationalFields: string[] = [`metaSEOId`, `CMS_id`];

export const CMSRelationalFieldsMapper: { [key: string]: string } = { metaSEOId: `metaSEOId`, CMS_id: `CMS_id` };