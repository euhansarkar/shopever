export const CouponSearchableFields: string[] = [`name`, `description`];

export const CouponFilterableFields: string[] = [`searchTerm`, `id`, `parent_id`, `position`, `meta_SEO_id`, `attribute_group_id`, `Coupon_id`];


export const CouponRelationalFields: string[] = [`meta_SEO_id`, `attribute_group_id`, `Coupon_id`];

export const CouponRelationalFieldsMapper: { [key: string]: string } = { meta_SEO_id: `meta_SEO_id`, attribute_group_id: `attribute_group_id`, Coupon_id: `Coupon_id` };